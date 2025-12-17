import type { preHandlerHookHandler } from 'fastify'

declare module 'fastify' {
    interface FastifyInstance {
        apiKeyAuth: preHandlerHookHandler
    }
}
