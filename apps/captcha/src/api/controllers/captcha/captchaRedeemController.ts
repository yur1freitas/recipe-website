import { z } from 'zod'
import Cap from '@cap.js/server'

import type { CaptchaTokenRepository } from '~/models/CaptchaTokenRepository'
import type { CaptchaSolutionRepository } from '~/models/CaptchaSolutionRepository'
import type { CaptchaChallengeRepository } from '~/models/CaptchaChallengeRepository'

import { createController } from '~/utils/controller'

interface Options {
    captchaChallengeRepository: CaptchaChallengeRepository
    captchaSolutionRepository: CaptchaSolutionRepository
    captchaTokenRepository: CaptchaTokenRepository
}

export const captchaRedeemController = createController<Options>(
    (app, options) => {
        const {
            captchaChallengeRepository,
            captchaSolutionRepository,
            captchaTokenRepository
        } = options

        app.post(
            '/captcha/:siteKey/redeem',
            {
                schema: {
                    params: z.object({
                        siteKey: z
                            .string()
                            .regex(/[\dA-F]+/gi)
                            .nonempty()
                    }),
                    body: z.object({
                        token: z.string().nonempty(),
                        solutions: z.array(z.number())
                    }),
                    response: {
                        200: z.object({
                            success: z.boolean(),
                            message: z.string().nonempty().optional(),
                            token: z.string().nonempty().optional(),
                            expires: z.int().positive().optional()
                        })
                    }
                }
            },
            async (request, reply) => {
                const { siteKey } = request.params
                const { token, solutions } = request.body

                const challenge = await captchaChallengeRepository.find({
                    siteKey,
                    token
                })

                if (!challenge) {
                    return reply.notFound(
                        'O desafio de captcha não foi encontrado'
                    )
                }

                await captchaChallengeRepository.delete({
                    siteKey,
                    token
                })

                const cap = new Cap({
                    noFSState: true,
                    state: {
                        challengesList: {
                            [challenge.token]: {
                                challenge: {
                                    c: challenge.count,
                                    s: challenge.saltSize,
                                    d: challenge.difficulty
                                },
                                expires: challenge.expiresAt
                            }
                        },
                        tokensList: {
                            [challenge.token]: challenge.expiresAt
                        }
                    }
                })

                const data = await cap.redeemChallenge({ token, solutions })

                if (!data.success) {
                    return reply.forbidden('A solução do captcha é inválida')
                }

                const now = Math.floor(Date.now() / 1000)
                const hourlyBucket = Math.floor(now / 3600) * 3600

                await captchaSolutionRepository.create({
                    bucket: hourlyBucket,
                    siteKey,
                    count: 1
                })

                if (data.token) {
                    await captchaTokenRepository.create({
                        siteKey,
                        token: data.token,
                        expiresAt: challenge.expiresAt,
                        createdAt: challenge.createdAt
                    })
                }

                return reply.send(data)
            }
        )
    }
)
