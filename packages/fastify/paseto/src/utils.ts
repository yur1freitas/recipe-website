import type { FailedOutput, SuccessOutput } from './types'

export function createSuccessOutput(
    token: string,
    payload: object
): SuccessOutput {
    return {
        valid: true,
        error: null,
        token,
        payload
    }
}

export function createFailedOutput(error: Error | null): FailedOutput {
    return {
        valid: false,
        token: null,
        payload: null,
        error
    }
}
