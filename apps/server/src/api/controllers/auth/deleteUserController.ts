import type { StandardSchemaTypeProvider } from '@standard-schema/fastify-type-provider'

import z from 'zod'

import fp from 'fastify-plugin'
import type { RawServerDefault } from 'fastify'

import { AuthError, DeleteUserErrors, LoginUserErrors } from '@core/auth'
import type { DeleteUser, LogoutUser, UserPayload } from '@core/auth'

import { validationErrorSchema } from '~/schemas/validationErrorSchema'
import { serverErrorSchema } from '~/schemas/serverErrorSchema'

interface Options {
    deleteUser: DeleteUser
    logoutUser: LogoutUser
}

export const deleteUserController = fp<
    Options,
    RawServerDefault,
    StandardSchemaTypeProvider
>((app, options) => {
    const { logoutUser, deleteUser } = options

    app.post(
        '/auth/delete',
        {
            schema: {
                tags: ['auth'],
                description: 'Rota de exclusão de conta',
                cookies: {
                    accessToken: z.string()
                },
                response: {
                    204: z
                        .undefined()
                        .describe('Conta do usuário excluída com sucesso'),
                    400: validationErrorSchema,
                    500: serverErrorSchema
                }
            },
            preHandler: [app.pasetoHandler()]
        },
        async (request, reply) => {
            const token = request.token!
            const { id } = request.tokenPayload as UserPayload

            const [deleteErr] = await app.to(deleteUser.execute({ id }))

            if (deleteErr) {
                if (AuthError.isError(deleteErr)) {
                    const { code, message } = deleteErr

                    switch (code) {
                        case DeleteUserErrors.UserDoesNotExist:
                            return reply.notFound(message)
                    }
                }

                return reply.internalServerError(deleteErr.message)
            }

            const [logoutErr] = await app.to(logoutUser.execute({ token }))

            if (logoutErr) {
                if (AuthError.isError(logoutErr)) {
                    const { code, message } = logoutErr

                    switch (code) {
                        case LoginUserErrors.UserDoesNotExist:
                            return reply.notFound(message)
                        case LoginUserErrors.IncorrectCredentials:
                            return reply.forbidden(message)
                    }
                }

                return reply.internalServerError(logoutErr.message)
            }

            const options = {
                path: '/',
                maxAge: 0,
                secure: false,
                httpOnly: true
            }

            return reply.status(204).cookie('accessToken', '', options).send()
        }
    )
})
