export type { CreateCaptchaAuthInput, CreateCaptchaAuthOutput } from './auth'
export type {
    CaptchaPreValidationOptions,
    CustomReplyFn,
    FastifyCaptchaOptions,
    ReplyOptions
} from './plugin'
export type { SiteVerifyInput } from './siteverify'
export type { FailedOutput, Output, SuccessOutput } from './types'

export { createCaptchaAuth } from './auth'
export { DEFAULT_FAILED_OUTPUT, DEFAULT_SUCCESS_OUTPUT } from './consts'
export { createFailedOutput, createSuccessOutput } from './utils'
export { siteVerify } from './siteverify'
export {
    DEFAULT_REPLY_OPTIONS,
    fastifyCaptcha,
    fastifyCaptcha as default
} from './plugin'
