import type { HttpError } from '@fastify/sensible'
import type { FastifyReply, FastifyRequest } from 'fastify'

import fp from 'fastify-plugin'
import { env } from '~/env'

declare module 'fastify' {
    interface FastifyContextConfig {
        captcha?: boolean
    }
}

interface Options {
    keyName: string
}

export const fastifyCaptcha = fp<Options>(
    (app, options) => {
        const { keyName } = options

        const captchaHandler = async (
            request: FastifyRequest,
            reply: FastifyReply
        ) => {
            const body = request.body as Record<string, string>

            const token = body?.[keyName]

            if (!token) {
                return reply.badRequest('É necessário resolver o captcha')
            }

            delete body[keyName]

            const [err, response] = await app.to(
                fetch(`${env.CAPTCHA_URL}/siteverify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${env.CAPTCHA_API_KEY}`
                    },
                    body: JSON.stringify(
                        {
                            secretKey: env.CAPTCHA_SECRET_KEY,
                            token
                        },
                        null,
                        0
                    )
                })
            )

            if (!response.ok) {
                const httpError = (await response.json()) as HttpError

                switch (httpError.statusCode) {
                    case 401:
                    case 404:
                        return reply.badRequest(
                            'Captcha mal resolvido ou já resolvido anteriormente. Reinicie e tente novamente'
                        )
                    case 403:
                        return reply.serverError(httpError)
                }
            }

            if (err) {
                return reply.serverError(err)
            }
        }

        app.addHook('onRoute', (routeOptions) => {
            if (!routeOptions?.config?.captcha) return

            if (routeOptions.preValidation) {
                if (Array.isArray(routeOptions.preValidation)) {
                    routeOptions.preValidation = [
                        ...routeOptions.preValidation,
                        captchaHandler
                    ]
                } else {
                    routeOptions.preValidation = [
                        routeOptions.preValidation,
                        captchaHandler
                    ]
                }
            }

            routeOptions.preValidation = captchaHandler
        })
    },
    {
        name: '@fastify/captcha',
        dependencies: ['@fastify/sensible']
    }
)
