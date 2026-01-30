import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { ValidatorError } from '@core/shared'
import type { RegisterUser } from '@core/auth'
import { AuthError, RegisterUserErrors, userSchema } from '@core/auth'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'

interface Options {
    registerUser: RegisterUser
}

export const registerUserController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { registerUser } = options

    app.post(
        '/auth/register',
        {
            schema: {
                tags: ['auth'],
                description: 'Rota para registrar um usuário',
                body: userSchema.omit({ id: true }),
                response: {
                    201: z
                        .undefined()
                        .describe('Usuário cadastrado com sucesso'),
                    400: validationErrorSchema,
                    409: httpErrorSchema.describe(
                        'O email do usuário já está cadastrado'
                    ),
                    500: serverErrorSchema
                }
            },
            preValidation: [app.captchaHandler()]
        },
        async (request, reply) => {
            const { name, email, password } = request.body

            const [err] = await app.to(
                registerUser.execute({ name, email, password })
            )

            if (!err) {
                return reply.status(201).send()
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

            return reply.internalServerError(err.message)
        }
    )
})
