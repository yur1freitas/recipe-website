import type { FailedOutput, SuccessOutput } from './types'

export const DEFAULT_SUCCESS_OUTPUT: SuccessOutput = {
    valid: true,
    error: null
}

export const DEFAULT_FAILED_OUTPUT: FailedOutput = {
    valid: false,
    error: null
}
