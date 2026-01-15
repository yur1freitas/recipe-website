import { hash } from 'bcrypt'
import { z } from 'zod'

import type { APIKeyRepository } from '~/models/APIKeyRepository'
import type { APIKeyGenerator } from '~/models/APIKeyGenerator'

import { createController } from '~/utils/controller'

interface Options {
    apiKeyGenerator: APIKeyGenerator
    apiKeyRepository: APIKeyRepository
}

export const apiKeysController = createController<Options>((app, options) => {
    const { apiKeyGenerator, apiKeyRepository } = options

    app.post(
        '/settings/apiKeys',
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
                        apiKey: z.string().nonempty()
                    })
                }
            }
        },
        async (request, reply) => {
            const { name } = request.body

            const { id, token, apiKey } = apiKeyGenerator.create()

            const tokenHash = await hash(token, 10)
            const createdAt = Date.now()

            await apiKeyRepository.create({
                id,
                name,
                createdAt,
                token: tokenHash
            })

            return reply.send({ apiKey })
        }
    )

    app.get(
        '/settings/apiKeys',
        {
            schema: {
                response: {
                    200: z.array(
                        z.object({
                            id: z.string().nonempty(),
                            name: z.string().nonempty(),
                            createdAt: z.string().nonempty()
                        })
                    )
                }
            }
        },
        async (_, reply) => {
            const apikeys = await apiKeyRepository.findAll()

            const data = apikeys.map(({ id, name, createdAt }) => ({
                id,
                name,
                createdAt: new Date(createdAt).toISOString()
            }))

            return reply.send(data)
        }
    )

    app.delete(
        '/settings/apiKeys/:id',
        {
            preHandler: app.auth([app.tokenAuth(), app.apiKeyAuth], {
                relation: 'or'
            }),
            schema: {
                params: z.object({
                    id: z.string().nonempty()
                }),
                response: {
                    204: z.null()
                }
            }
        },
        async (request, reply) => {
            const { id } = request.params

            const apiKey = await apiKeyRepository.find({ id })

            if (!apiKey) {
                return reply.notFound(
                    'Não foi possível encontrar a chave de acesso'
                )
            }

            await apiKeyRepository.delete({ id })

            return reply.status(204).send()
        }
    )
})
