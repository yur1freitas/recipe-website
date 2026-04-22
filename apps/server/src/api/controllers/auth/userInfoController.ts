import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import type { RawServerDefault } from 'fastify'

import fp from 'fastify-plugin'

import type {
    AccessTokenPayload,
    User,
    UserRepositoryProvider
} from '@core/auth'

import { userSchema } from '@core/auth'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { serverErrorSchema } from '~/schemas/serverErrorSchema'
import { httpErrorSchema } from '~/schemas/httpErrorSchema'

interface Options {
    userRepository: UserRepositoryProvider
}

export const userInfoController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { userRepository } = options

    app.get(
        '/auth/me',
        {
            schema: {
                tags: ['auth'],
                description: 'Rota para recuperar informações do usuário',
                cookies: {
                    accessToken: z.string()
                },
                response: {
                    200: userSchema
                        .omit({ password: true })
                        .describe('Informações do usuário'),
                    400: validationErrorSchema,
                    404: httpErrorSchema.describe(
                        'O usuário não foi encontrado'
                    ),
                    500: serverErrorSchema
                }
            },
            preValidation: [app.pasetoHandler()]
        },
        async (request, reply) => {
            const { userId } = request.tokenPayload as AccessTokenPayload

            // O app.pasetoHandler() garante que o usuário existe
            const [err, data] = await app.to(
                userRepository.findById(userId) as Promise<User>
            )

            if (!err) {
                const { id, name, email } = data.props

                return reply.status(200).send({ id, name, email })
            }

            return reply.internalServerError(err.message)
        }
    )
})
