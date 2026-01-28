export type { FailedOutput, SuccessOutput, Output } from './types'
export type {
    CustomReplyFn,
    ReplyOptions,
    FastifyPasetoOptions,
    PasetoPreHandlerOptions
} from './plugin'
export type {
    CreatePasetoAuthInput,
    CreatePasetoAuthOutput,
    CustomValidationLogicFn
} from './auth'

export { DEFAULT_FAILED_OUTPUT, createPasetoAuth } from './auth'
export {
    DEFAULT_REPLY_OPTIONS,
    fastifyPaseto,
    fastifyPaseto as default
} from './plugin'
export { createFailedOutput, createSuccessOutput } from './utils'
