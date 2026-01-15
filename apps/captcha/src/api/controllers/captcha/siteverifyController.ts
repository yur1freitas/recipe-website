import { compare } from 'bcrypt'
import { z } from 'zod'

import type { CaptchaTokenRepository } from '~/models/CaptchaTokenRepository'
import type { CaptchaKeysRepository } from '~/models/CaptchaKeysRepository'

import { createController } from '~/utils/controller'

interface Options {
    captchaKeysRepository: CaptchaKeysRepository
    captchaTokenRepository: CaptchaTokenRepository
}

export const siteverifyController = createController<Options>(
    (app, options) => {
        const { captchaKeysRepository, captchaTokenRepository } = options

        app.post(
            '/captcha/:siteKey/siteverify',
            {
                preHandler: app.apiKeyAuth,
                schema: {
                    params: z.object({
                        siteKey: z.string().nonempty()
                    }),
                    body: z.object({
                        token: z.string().nonempty(),
                        secretKey: z.string().nonempty()
                    }),
                    response: {
                        204: z.null()
                    }
                }
            },
            async (request, reply) => {
                const { siteKey } = request.params
                const { token, secretKey } = request.body

                const captchaKeys = await captchaKeysRepository.find({
                    siteKey
                })

                if (!captchaKeys) {
                    return reply.notFound('A chave é inválida ou não existe')
                }

                const isValidSecret = await compare(
                    secretKey,
                    captchaKeys.secretKey
                )

                if (!isValidSecret) {
                    return reply.forbidden(
                        'A chave ou segredo são inválidos ou não existem'
                    )
                }

                const captchaToken = await captchaTokenRepository.find({
                    siteKey,
                    token
                })

                if (!captchaToken) {
                    return reply.notFound(
                        'O token fornecido é inválido ou não existe'
                    )
                }

                await captchaTokenRepository.delete({ siteKey, token })

                const now = Date.now()

                if (captchaToken.expiresAt < now) {
                    return reply.unauthorized('O token está expirado')
                }

                return reply.status(204).send()
            }
        )
    }
)
