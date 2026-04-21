import type { FastifyReply, preHandlerHookHandler } from 'fastify'

import fp from 'fastify-plugin'
import '@fastify/sensible'
import type { CreatePasetoAuthInput, CreatePasetoAuthOutput } from './auth'

import { createPasetoAuth } from './auth'

export type CustomReplyFn = (reply: FastifyReply, error: Error | null) => void

export interface ReplyOptions {
    /**
     * @default true
     */
    enabled?: boolean
    /**
     * @default 'Você não está uma sessão válida'
     */
    message?: string
    custom?: CustomReplyFn
}

export interface FastifyPasetoOptions extends CreatePasetoAuthInput {
    reply?: ReplyOptions
}

export interface PasetoPreHandlerOptions {
    reply?: ReplyOptions
}

export const DEFAULT_REPLY_OPTIONS: ReplyOptions = {
    enabled: true,
    message: 'Você não está uma sessão válida'
}

export const fastifyPaseto = fp<FastifyPasetoOptions>(
    (app, options) => {
        const { reply, ...authOptions } = options
        const replyOptions = { ...DEFAULT_REPLY_OPTIONS, ...reply }

        const auth = createPasetoAuth(authOptions)

        const preHandler = (
            options?: PasetoPreHandlerOptions
        ): preHandlerHookHandler => {
            return async (request, reply): Promise<void> => {
                const { valid, token, payload, error } = await auth(request)

                request.isAuth = valid
                request.token = token
                request.tokenPayload = payload

                if (!valid) {
                    if (options?.reply?.custom) {
                        return options.reply.custom(reply, error)
                    }

                    if (options?.reply?.enabled) {
                        return reply.unauthorized(options?.reply.message)
                    }

                    if (replyOptions?.custom) {
                        return replyOptions.custom(reply, error)
                    }

                    if (replyOptions?.enabled) {
                        return reply.unauthorized(replyOptions?.message)
                    }
                }
            }
        }

        app.decorate('pasetoAuth', auth)
        app.decorate('pasetoHandler', preHandler)

        app.decorateRequest('token', null)
        app.decorateReply('tokenPayload', null)
        app.decorateRequest('isAuth', false)
    },
    {
        name: '@fastify/paseto',
        dependencies: ['@fastify/cookie', '@fastify/sensible']
    }
)

declare module 'fastify' {
    interface FastifyInstance {
        pasetoAuth: CreatePasetoAuthOutput
        pasetoHandler: (
            options?: PasetoPreHandlerOptions
        ) => preHandlerHookHandler
    }

    interface FastifyRequest {
        isAuth: boolean
        token: string | null
        tokenPayload: object | null
    }
}
