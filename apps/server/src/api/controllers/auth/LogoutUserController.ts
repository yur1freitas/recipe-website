import z from 'zod'

import { ValidatorError } from '@core/shared'
import type { LogoutUser } from '@core/auth'
import { AuthError, LoginUserErrors } from '@core/auth'

import { createController } from '~/utils/controller'
import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'

interface Options {
    logoutUser: LogoutUser
}

export const logoutUserController = createController<Options>(
    (app, options) => {
        const { logoutUser } = options

        app.get(
            '/auth/logout',
            {
                config: {
                    auth: 'paseto',
                    rateLimit: {
                        max: 5,
                        timeWindow: '1 hour'
                    }
                },
                schema: {
                    tags: ['auth'],
                    description: 'Desconectar o usuário da sessão',
                    response: {
                        204: z
                            .null()
                            .describe('Usuário deconectado com sucesso'),
                        400: httpErrorSchema.describe('Erro de validação'),
                        500: serverErrorSchema
                    }
                }
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

                    return reply.cookie('accessToken', '', options).noContent()
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
    }
)
