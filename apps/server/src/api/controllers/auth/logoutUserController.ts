import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { ValidatorError } from '@core/shared'
import { AuthError, LoginUserErrors } from '@core/auth'
import type { LogoutUser } from '@core/auth'

import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'

interface Options {
    logoutUser: LogoutUser
}

export const logoutUserController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { logoutUser } = options

    app.get(
        '/auth/logout',
        {
            config: {
                rateLimit: {
                    max: 5,
                    timeWindow: '1 hour'
                }
            },
            schema: {
                tags: ['auth'],
                description: 'Desconectar o usuário da sessão',
                response: {
                    204: z.null().describe('Usuário deconectado com sucesso'),
                    400: httpErrorSchema.describe('Erro de validação'),
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
        },
        async (request, reply) => {
            const { accessToken } = request.cookies

            const [err] = await app.to(
                logoutUser.execute({ token: accessToken! })
            )

            if (!err) {
                const options = {
                    path: '/',
                    maxAge: 0,
                    secure: false,
                    httpOnly: true
                }

                return reply.status(204).cookie('accessToken', '', options)
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
