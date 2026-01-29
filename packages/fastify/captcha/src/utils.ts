import type { FailedOutput, SuccessOutput } from './types'

export function createSuccessOutput(): SuccessOutput {
    return {
        valid: true,
        error: null
    }
}

export function createFailedOutput(error: Error | null): FailedOutput {
    return {
        valid: false,
        error
    }
}
