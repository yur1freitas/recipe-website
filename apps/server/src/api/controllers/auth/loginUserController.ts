import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { emailSchema, passwordSchema, ValidatorError } from '@core/shared'
import { AuthError, LoginUserErrors } from '@core/auth'
import type { LoginUser } from '@core/auth'

import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'

interface Options {
    loginUser: LoginUser
}

export const loginUserController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { loginUser } = options

    app.post(
        '/auth/login',
        {
            schema: {
                tags: ['auth'],
                description: 'Rota de login de conta',
                body: z.object({
                    email: emailSchema,
                    password: passwordSchema
                }),
                response: {
                    200: z
                        .object({
                            token: z.string()
                        })
                        .describe(
                            'Logado com sucesso e retorna token de acesso'
                        ),
                    400: httpErrorSchema.describe('Error de validação'),
                    403: httpErrorSchema.describe(
                        'Credenciais de acesso incorretas'
                    ),
                    404: httpErrorSchema.describe(
                        'Não existe um usuário com o email cadastrado'
                    ),
                    500: serverErrorSchema
                }
            },
            preValidation: [app.captchaHandler()]
        },
        async (request, reply) => {
            const { email, password } = request.body

            const [err, data] = await app.to(
                loginUser.execute({ email, password })
            )

            if (!err) {
                return reply.send({ token: data.token })
            }

            if (AuthError.isError(err) || ValidatorError.isError(err)) {
                const { code, message } = err

                switch (code) {
                    case LoginUserErrors.UserDoesNotExist:
                        return reply.notFound(message)
                    case LoginUserErrors.IncorrectCredentials:
                        return reply.forbidden(message)
                    default:
                        return reply.badRequest(message)
                }
            }

            return reply.serverError(err)
        }
    )
})
