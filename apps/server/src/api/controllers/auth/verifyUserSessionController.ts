import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import type { RawServerDefault } from 'fastify'

import fp from 'fastify-plugin'

import type { AccessTokenPayload } from '@core/auth'

import { idSchema } from '@core/shared'

import { serverErrorSchema } from '~/schemas/serverErrorSchema'
import { httpErrorSchema } from '~/schemas/httpErrorSchema'

export const verifyUserSessionController = fp<
    any,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app) => {
    app.get(
        '/auth/verify',
        {
            schema: {
                tags: ['auth'],
                description: 'Verificar a sessão do usuário',
                querystring: z.object({
                    payload: z.coerce.boolean<boolean>().default(false)
                }),
                cookies: {
                    accessToken: z.string().optional()
                },
                response: {
                    200: z
                        .object({ userId: idSchema })
                        .describe(
                            'A sessão do usuário é válida e o payload foi retornado'
                        ),
                    204: z.undefined().describe('A sessão do usuário é válida'),
                    401: httpErrorSchema.describe(
                        'A sessão do usuário é inválida'
                    ),
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
        },
        async (request, reply) => {
            const { payload } = request.query

            if (payload) {
                const { userId } = request.tokenPayload as AccessTokenPayload

                return reply.status(200).send({ userId })
            }

            return reply.status(204).send()
        }
    )
})
