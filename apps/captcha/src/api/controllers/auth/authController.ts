import { randomUUID, timingSafeEqual } from 'node:crypto'

import { z } from 'zod'
import { hash } from 'bcrypt'

import { createController } from '~/utils/controller'

import type { UserSessionRepository } from '~/models/UserSessionRepository'
import type { SessionToken } from '~/models/SessionToken'

import { env } from '~/env'

interface Options {
    sessionToken: SessionToken
    userSessionRepository: UserSessionRepository
}

export const authController = createController<Options>((app, options) => {
    const { sessionToken, userSessionRepository } = options

    app.post(
        '/auth/login',
        {
            config: {
                rateLimit: {
                    max: 5,
                    timeWindow: 30_000
                }
            },
            schema: {
                body: z.object({
                    adminKey: z.string().nonempty()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { adminKey } = request.body

            const a = Buffer.from(adminKey, 'utf-8')
            const b = Buffer.from(env.ADMIN_KEY, 'utf-8')

            const isInvalid = a.length !== b.length || !timingSafeEqual(a, b)

            if (isInvalid) {
                return reply.unauthorized('Acesso não autorizado')
            }

            const id = randomUUID()
            const accessToken = sessionToken.create({ id })
            const accessTokenHash = await hash(accessToken, 10)

            const oneHour = 1000 * 60 * 60
            const createdAt = Date.now()
            const expiresAt = createdAt + oneHour

            await userSessionRepository.create({
                id,
                createdAt,
                expiresAt,
                accessToken: accessTokenHash
            })

            return reply
                .cookie('accessToken', accessToken, {
                    httpOnly: true,
                    sameSite: 'lax',
                    signed: true,
                    maxAge: 60 * 60,
                    path: '/'
                })
                .status(204)
                .send()
        }
    )

    app.post(
        '/auth/logout',
        {
            preHandler: [app.tokenAuth()],
            config: {
                rateLimit: {
                    max: 5,
                    timeWindow: 30_000
                }
            },
            schema: {
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { accessToken } = request

            const payload = sessionToken.decode<{ id: string }>(accessToken!)!

            await userSessionRepository.delete({ id: payload.id })

            return reply
                .cookie('accessToken', '', {
                    httpOnly: true,
                    sameSite: 'lax',
                    signed: false,
                    maxAge: 0,
                    path: '/'
                })
                .status(204)
                .send()
        }
    )
})
