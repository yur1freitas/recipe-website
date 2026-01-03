import z from 'zod'

import type { RegisterUser, RegisterUserInput } from '@core/auth'
import { AuthError, RegisterUserErrors } from '@core/auth'

import {
    $emailSchema,
    $passwordSchema,
    $usernameSchema,
    ValidatorError
} from '@core/shared'

import { createController } from '~/utils/controller'
import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'

interface Options {
    registerUser: RegisterUser
}

export const registerUserController = createController<Options>(
    (app, options) => {
        const { registerUser } = options

        app.post(
            '/auth/register',
            {
                config: {
                    captcha: true
                },
                schema: {
                    tags: ['auth'],
                    description: 'Rota para registrar um usuário',
                    body: z.object({
                        name: $usernameSchema,
                        email: $emailSchema,
                        password: $passwordSchema
                    }),
                    response: {
                        201: z
                            .null()
                            .describe('Usuário cadastrado com sucesso'),
                        400: httpErrorSchema.describe('Erro de validação'),
                        409: httpErrorSchema.describe(
                            'O email do usuário já está cadastrado'
                        ),
                        500: serverErrorSchema
                    }
                }
            },
            async (request, reply) => {
                const { name, email, password } =
                    request.body as RegisterUserInput

                const [err] = await app.to(
                    registerUser.execute({ name, email, password })
                )

                if (!err) {
                    return reply.created()
                }

                if (AuthError.isError(err) || ValidatorError.isError(err)) {
                    const { code, message } = err

                    switch (code) {
                        case RegisterUserErrors.UserAlreadyExists:
                            return reply.conflict(message)
                        case RegisterUserErrors.FailedRegisterUser:
                            return reply.internalServerError(message)
                        default:
                            return reply.badRequest(message)
                    }
                }

                return reply.serverError(err)
            }
        )
    }
)
