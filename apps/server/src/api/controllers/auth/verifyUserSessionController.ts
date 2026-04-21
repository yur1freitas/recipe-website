import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import type { RawServerDefault } from 'fastify'

import fp from 'fastify-plugin'

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
                cookies: {
                    accessToken: z.string().optional()
                },
                response: {
                    204: z.undefined().describe('A sessão do usuário é válida'),
                    401: httpErrorSchema.describe(
                        'A sessão do usuário é inválida'
                    ),
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
        },
        async (_, reply) => {
            return reply.status(204).send()
        }
    )
})
