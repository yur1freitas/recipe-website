import type { FastifyReply } from 'fastify'

import fp from 'fastify-plugin'

declare module 'fastify' {
    interface FastifyReply {
        /** Status: `200` */
        ok(payload?: unknown): FastifyReply
        /** Status: `201` */
        created(payload?: unknown): FastifyReply
        /** Status: `204` */
        noContent(): FastifyReply
    }
}

export const fastifyResponse = fp(
    (fastify, _, next) => {
        fastify.decorateReply(
            'ok',
            function(this: FastifyReply, payload?: unknown): FastifyReply {
                this.status(200)
                this.send(payload)
                return this
            }
        )

        fastify.decorateReply(
            'created',
            function(this: FastifyReply, payload?: unknown): FastifyReply {
                this.status(201)
                this.send(payload)
                return this
            }
        )

        fastify.decorateReply(
            'noContent',
            function(this: FastifyReply): FastifyReply {
                this.status(204)
                this.send()
                return this
            }
        )

        next()
    },
    {
        name: '@fastify/response',
        fastify: '5.x'
    }
)
