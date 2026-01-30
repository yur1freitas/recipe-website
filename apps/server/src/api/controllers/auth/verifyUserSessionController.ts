import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

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
