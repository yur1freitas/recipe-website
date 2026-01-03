import z from 'zod'

import type { VerifyUserSession } from '@core/auth'
import { AuthError, VerifyUserSessionErrors } from '@core/auth'

import { ValidatorError } from '@core/shared'

import { httpErrorSchema, serverErrorSchema } from '~/schemas/httpErrorSchema'
import { createController } from '~/utils/controller'

interface Options {
    verifyUserSession: VerifyUserSession
}

export const verifyUserSessionController = createController<Options>(
    (app, options) => {
        const { verifyUserSession } = options

        app.get(
            '/auth/verify',
            {
                schema: {
                    tags: ['auth'],
                    description: 'Verificar a sessão do usuário',
                    response: {
                        201: z.null().describe('A sessão do usuário é válida'),
                        400: httpErrorSchema.describe('Erro de validação'),
                        401: httpErrorSchema.describe(
                            'Token de acesso inválido'
                        ),
                        500: serverErrorSchema
                    }
                }
            },
            async (request, reply) => {
                const { accessToken } = request.cookies

                if (!accessToken) {
                    return reply.badRequest(
                        'Você não está em uma sessão válida'
                    )
                }

                const [err] = await app.to(
                    verifyUserSession.execute({ token: accessToken })
                )

                if (!err) {
                    return reply.noContent()
                }

                if (AuthError.isError(err) || ValidatorError.isError(err)) {
                    const { code, message } = err

                    switch (code) {
                        case VerifyUserSessionErrors.InvalidAccessToken:
                        case VerifyUserSessionErrors.UserNotFound:
                            return reply.unauthorized(message)
                        default:
                            return reply.badRequest(message)
                    }
                }

                return reply.serverError(err)
            }
        )
    }
)
