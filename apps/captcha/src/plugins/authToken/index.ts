import type { preHandlerHookHandler } from 'fastify'

import fp from 'fastify-plugin'

import type { SessionToken } from '~/models/SessionToken'
import type { UserSessionRepository } from '~/models/UserSessionRepository'

import { createUserSessionValidator } from './utils'

interface Options {
    sessionToken: SessionToken
    userSessionRepository: UserSessionRepository
}

export const fastifyTokenAuth = fp<Options>(
    (app, options) => {
        const { sessionToken, userSessionRepository } = options

        const validateUserSession = createUserSessionValidator({
            sessionToken,
            userSessionRepository
        })

        const createPreHandler = (
            autoReply: boolean = true
        ): preHandlerHookHandler => {
            return async (request, reply) => {
                const {
                    isValid,
                    accessToken
                } = await validateUserSession(request)

                if (!isValid && autoReply) {
                    return reply.unauthorized('O token de acesso é inválido')
                }

                request.isAuth = isValid
                request.accessToken = accessToken
            }
        }

        app.decorateRequest('isAuth', false)
        app.decorateRequest('accessToken', null)

        app.decorate('tokenAuth', createPreHandler)
        app.decorate('validateUserSession', validateUserSession)
    },
    {
        name: '@fastify/token-auth',
        dependencies: ['@fastify/sensible']
    }
)
