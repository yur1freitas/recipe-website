import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import type { RawServerDefault } from 'fastify'

import fp from 'fastify-plugin'

import type { AccessTokenPayload, UpdateUser } from '@core/auth'

import { ValidatorError } from '@core/shared'
import { AuthError, UpdateUserErrors, userSchema } from '@core/auth'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { serverErrorSchema } from '~/schemas/serverErrorSchema'
import { httpErrorSchema } from '~/schemas/httpErrorSchema'

interface Options {
    updateUser: UpdateUser
}

export const updateUserController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { updateUser } = options

    app.post(
        '/auth/update',
        {
            schema: {
                tags: ['auth'],
                description: 'Rota para atualizar os dados de um usuário',
                body: userSchema.omit({ id: true }).partial(),
                cookies: {
                    accessToken: z.string()
                },
                response: {
                    201: z
                        .undefined()
                        .describe('Usuário atualizado com sucesso'),
                    400: validationErrorSchema,
                    404: httpErrorSchema.describe(
                        'O usuário não foi encontrado'
                    ),
                    500: serverErrorSchema
                }
            },
            preValidation: [app.pasetoHandler(), app.captchaHandler()]
        },
        async (request, reply) => {
            const { userId: id } = request.tokenPayload as AccessTokenPayload
            const { name, email, password } = request.body

            const [err] = await app.to(
                updateUser.execute({ id, name, email, password })
            )

            if (!err) {
                return reply.status(201).send()
            }

            if (AuthError.isError(err) || ValidatorError.isError(err)) {
                const { code, message } = err

                switch (code) {
                    case UpdateUserErrors.UserNotFound:
                        return reply.notFound(message)
                    case UpdateUserErrors.FailedUpdateUser:
                        return reply.internalServerError(message)
                    default:
                        return reply.badRequest(message)
                }
            }

            return reply.internalServerError(err.message)
        }
    )
})
