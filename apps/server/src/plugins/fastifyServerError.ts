import type { FastifyReply } from 'fastify'

import fp from 'fastify-plugin'

import { DEFAULT_SERVER_ERROR_MESSAGE } from '~/consts'

declare module 'fastify' {
    interface FastifyReply {
        serverError(error: Error, message?: string): void
    }
}

export const fastifyServerError = fp(
    (fastify, _, next) => {
        fastify.decorateReply(
            'serverError',
            function (
                this: FastifyReply,
                error,
                message: string = DEFAULT_SERVER_ERROR_MESSAGE
            ): void {
                fastify.log.error(error)
                this.internalServerError(message)
            }
        )

        next()
    },
    {
        name: '@fastify/server-error',
        dependencies: ['@fastify/sensible'],
        fastify: '5.x'
    }
)
