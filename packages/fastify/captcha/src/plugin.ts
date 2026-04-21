import type { FastifyReply, preValidationHookHandler } from 'fastify'

import fp from 'fastify-plugin'

import type { CreateCaptchaAuthInput, CreateCaptchaAuthOutput } from './auth'

import { createCaptchaAuth } from './auth'

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

export interface FastifyCaptchaOptions extends CreateCaptchaAuthInput {
    reply?: ReplyOptions
}

export interface CaptchaPreValidationOptions {
    reply?: ReplyOptions
}

export const DEFAULT_REPLY_OPTIONS: ReplyOptions = {
    enabled: true,
    message:
        'Captcha não resolvido ou já resolvido anteriormente. Por favor tente novamente'
}

export const fastifyCaptcha = fp<FastifyCaptchaOptions>(
    (app, options) => {
        const { reply, ...authOptions } = options
        const replyOptions = { ...DEFAULT_REPLY_OPTIONS, ...reply }

        const auth = createCaptchaAuth(authOptions)

        const preValidation = (
            options?: CaptchaPreValidationOptions
        ): preValidationHookHandler => {
            return async (request, reply): Promise<void> => {
                const { valid, error } = await auth(request)

                if (!valid) {
                    if (options?.reply?.custom) {
                        return options.reply.custom(reply, error)
                    }

                    if (options?.reply?.enabled) {
                        return reply.badRequest(options?.reply.message)
                    }

                    if (replyOptions?.custom) {
                        return replyOptions.custom(reply, error)
                    }

                    if (replyOptions?.enabled) {
                        return reply.badRequest(replyOptions?.message)
                    }
                }
            }
        }

        app.decorate('captchaAuth', auth)
        app.decorate('captchaHandler', preValidation)
    },
    {
        name: '@fastify/captcha',
        dependencies: ['@fastify/sensible']
    }
)

declare module 'fastify' {
    interface FastifyInstance {
        captchaAuth: CreateCaptchaAuthOutput
        captchaHandler: () => preValidationHookHandler
    }
}
