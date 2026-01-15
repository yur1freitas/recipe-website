import { hash } from 'bcrypt'
import { z } from 'zod'

import type { CaptchaKeysRepository } from '~/models/CaptchaKeysRepository'
import type { CaptchaKeysGenerator } from '~/models/CaptchaKeysGenerator'

import { createController } from '~/utils/controller'
import { DEFAULT_CAPTCHA_CONFIG } from '~/consts'
import { db } from '~/db/sqlite'

interface Options {
    captchaKeysGenerator: CaptchaKeysGenerator
    captchaKeysRepository: CaptchaKeysRepository
}

export const captchaKeysController = createController<Options>(
    (app, options) => {
        const { captchaKeysGenerator, captchaKeysRepository } = options

        app.get(
            '/captcha/keys',
            {
                preHandler: app.auth([app.tokenAuth(), app.apiKeyAuth], {
                    relation: 'or'
                }),
                schema: {
                    response: {
                        200: z.array(
                            z.object({
                                name: z.string().nonempty(),
                                siteKey: z.string().nonempty(),
                                createdAt: z.int().positive()
                            })
                        )
                    }
                }
            },
            async (_, reply) => {
                const now = Date.now() / 1000
                const day = 24 * 60 * 60

                const currentStart = now
                const previousStart = now - 2 * day

                const captchaKeys = await captchaKeysRepository.findAll()

                const promises = captchaKeys.map(async (keys) => {
                    const [currentTotal] = await db
                        .selectFrom('captchaSolutions')
                        .select(({ fn }) =>
                            fn<number>('sum', ['count']).as('total')
                        )
                        .where('siteKey', '=', keys.siteKey)
                        .where('bucket', '>=', currentStart)
                        .execute()

                    const [previosTotal] = await db
                        .selectFrom('captchaSolutions')
                        .select(({ fn }) =>
                            fn<number>('sum', ['count']).as('total')
                        )
                        .where('siteKey', '=', keys.siteKey)
                        .where('bucket', '>=', previousStart)
                        .where('bucket', '<', currentStart)
                        .execute()

                    const current = currentTotal.total ?? 0
                    const previous = previosTotal.total ?? 0

                    let change = 0
                    let direction = ''

                    if (previous > 0) {
                        change = ((current - previous) / previous) * 100

                        direction =
                            current > previous
                                ? 'up'
                                : current < previous
                                  ? 'down'
                                  : ''
                    } else if (current > 0) {
                        change = 100
                        direction = 'up'
                    }

                    return {
                        name: keys.name,
                        siteKey: keys.siteKey,
                        createdAt: keys.createdAt,
                        solvesLast24h: current,
                        difference: {
                            value: change.toFixed(2),
                            direction
                        }
                    }
                })

                const data = await Promise.all(promises)

                return reply.status(200).send(data)
            }
        )

        app.post(
            '/captcha/keys',
            {
                preHandler: app.auth([app.tokenAuth(), app.apiKeyAuth], {
                    relation: 'or'
                }),
                schema: {
                    body: z.object({
                        name: z.string().nonempty().max(120)
                    }),
                    response: {
                        200: z.object({
                            siteKey: z.string().nonempty(),
                            secretKey: z.string().nonempty()
                        })
                    }
                }
            },
            async (request, reply) => {
                const { name } = request.body

                const siteKey = captchaKeysGenerator.createSiteKey()

                const secretKey = captchaKeysGenerator.createSecretKey()
                const secretKeyHash = await hash(secretKey, 10)

                const createdAt = Date.now()

                await captchaKeysRepository.create({
                    name,
                    siteKey,
                    createdAt,
                    secretKey: secretKeyHash,
                    config: { ...DEFAULT_CAPTCHA_CONFIG }
                })

                return reply.send({ siteKey, secretKey })
            }
        )

        app.get(
            '/captcha/keys/:siteKey',
            {
                schema: {
                    params: z.object({
                        siteKey: z.string().nonempty()
                    }),
                    response: {
                        200: z.object({
                            name: z.string().nonempty().max(120).optional(),
                            siteKey: z.string().nonempty(),
                            createdAt: z.string().nonempty(),
                            config: z.object({
                                count: z.int().positive().optional(),
                                saltSize: z.int().positive().optional(),
                                difficulty: z.int().positive().optional()
                            })
                        })
                    }
                }
            },
            async (request, reply) => {
                const { siteKey } = request.params

                const captchaKeys = await captchaKeysRepository.find({
                    siteKey
                })

                if (!captchaKeys) {
                    return reply.notFound('A chave é inválida ou não existe')
                }

                const { name, config, createdAt } = captchaKeys

                const createdAtISO = new Date(createdAt).toISOString()

                return reply.send({
                    name,
                    config,
                    siteKey,
                    createdAt: createdAtISO
                })
            }
        )

        app.put(
            '/captcha/keys/:siteKey/config',
            {
                schema: {
                    params: z.object({
                        siteKey: z.string().nonempty()
                    }),
                    body: z.object({
                        name: z.string().nonempty().max(120).optional(),
                        count: z.int().positive().optional(),
                        saltSize: z.int().positive().optional(),
                        difficulty: z.int().positive().optional()
                    })
                }
            },
            async (request, reply) => {
                const { siteKey } = request.params
                const { name, saltSize, difficulty, count } = request.body

                const captchaKeys = await captchaKeysRepository.find({
                    siteKey
                })

                if (!captchaKeys) {
                    return reply.notFound('A chave é inválida ou não existe')
                }

                const config = {
                    ...DEFAULT_CAPTCHA_CONFIG,
                    name,
                    count,
                    saltSize,
                    difficulty
                }

                await captchaKeysRepository.update({
                    siteKey,
                    config
                })

                return reply.status(204).send()
            }
        )

        app.delete(
            '/captcha/keys/:siteKey',
            {
                schema: {
                    params: z.object({
                        siteKey: z
                            .string()
                            .regex(/[\dA-F]+/gi)
                            .nonempty()
                    })
                }
            },
            async (request, reply) => {
                const { siteKey } = request.params

                const captchaKeys = await captchaKeysRepository.find({
                    siteKey
                })

                if (!captchaKeys) {
                    return reply.notFound('A chave é inválida ou não existe')
                }

                await captchaKeysRepository.delete({ siteKey })

                return reply.status(200).send()
            }
        )

        app.post(
            '/captcha/keys/:siteKey/rotateSecret',
            {
                schema: {
                    params: z.object({
                        siteKey: z.string().nonempty()
                    })
                }
            },
            async (request, reply) => {
                const { siteKey } = request.params

                const captchaKeys = await captchaKeysRepository.find({
                    siteKey
                })

                if (!captchaKeys) {
                    return reply.notFound('A chave é inválida ou não existe')
                }

                const secretKey = captchaKeysGenerator.createSecretKey()
                const secretKeyHash = await hash(secretKey, 10)

                await captchaKeysRepository.update({
                    siteKey,
                    secretKey: secretKeyHash
                })

                return reply.send({ secretKey })
            }
        )
    }
)
