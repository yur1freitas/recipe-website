import type { FastifyReply, FastifyRequest } from 'fastify'

import fp from 'fastify-plugin'

import type { VerifyUserSession } from '@core/auth'
import { AuthError, VerifyUserSessionErrors } from '@core/auth'

import { ValidatorError } from '@core/shared'

declare module 'fastify' {
    interface FastifyContextConfig {
        auth?: 'paseto'
    }
}

interface Options {
    verifyUserSession: VerifyUserSession
}

export const fastifyAuth = fp<Options>(
    (app, options) => {
        const { verifyUserSession } = options

        const authHandler = async (
            request: FastifyRequest,
            reply: FastifyReply
        ) => {
            const { accessToken } = request.cookies

            if (!accessToken) {
                return reply.badRequest('Você não está em uma sessão válida')
            }

            const [err] = await app.to(
                verifyUserSession.execute({ token: accessToken })
            )

            if (!err) return

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

        app.addHook('onRoute', (routeOptions) => {
            if (routeOptions?.config?.auth !== 'paseto') return

            if (routeOptions.preHandler) {
                if (Array.isArray(routeOptions.preHandler)) {
                    routeOptions.preHandler = [
                        ...routeOptions.preHandler,
                        authHandler
                    ]
                } else {
                    routeOptions.preHandler = [
                        routeOptions.preHandler,
                        authHandler
                    ]
                }
            }

            routeOptions.preHandler = authHandler
        })
    },
    {
        name: '@fastify/auth',
        dependencies: ['@fastify/sensible']
    }
)
