import Cap from '@cap.js/server'
import { z } from 'zod'

import type { CaptchaChallengeRepository } from '~/models/CaptchaChallengeRepository'
import type { CaptchaKeysRepository } from '~/models/CaptchaKeysRepository'

import { createController } from '~/utils/controller'

interface Options {
    captchaKeysRepository: CaptchaKeysRepository
    captchaChallengeRepository: CaptchaChallengeRepository
}

export const captchaChallengeController = createController<Options>(
    (app, options) => {
        const { captchaKeysRepository, captchaChallengeRepository } = options

        app.post(
            '/captcha/:siteKey/challenge',
            {
                schema: {
                    params: z.object({
                        siteKey: z.string().nonempty()
                    }),
                    response: {
                        200: z.object({
                            token: z.string().nonempty().optional(),
                            challenge: z.object({
                                c: z.int(),
                                s: z.int(),
                                d: z.int()
                            }),
                            expires: z.int().positive()
                        })
                    }
                }
            },
            async (request, reply) => {
                const { siteKey } = request.params

                const cap = new Cap({ noFSState: true })

                const captchaKeys = await captchaKeysRepository.find({
                    siteKey
                })

                if (!captchaKeys) {
                    return reply.notFound('A chave é inválida ou não existe')
                }

                const { config } = captchaKeys

                const { token, expires, challenge } = await cap.createChallenge(
                    {
                        challengeCount: config.count,
                        challengeSize: config.saltSize,
                        challengeDifficulty: config.difficulty
                    }
                )

                const createdAt = Date.now()

                await captchaChallengeRepository.create({
                    siteKey,
                    createdAt,
                    token: token!,
                    expiresAt: expires,
                    count: challenge.c,
                    saltSize: challenge.s,
                    difficulty: challenge.d
                })

                return reply.send({ token, expires, challenge })
            }
        )
    }
)
