import type { preHandlerHookHandler } from 'fastify'
import type { ValidateUserSessionFn } from './utils'

declare module 'fastify' {
    interface FastifyInstance {
        tokenAuth: (autoReply?: boolean) => preHandlerHookHandler
        validateUserSession: ValidateUserSessionFn
    }

    interface FastifyRequest {
        isAuth: boolean
        accessToken: string | null
    }
}
