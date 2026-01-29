export interface SuccessOutput {
    valid: true
    error: null
}

export interface FailedOutput {
    valid: false
    error: Error | null
}

export type Output = SuccessOutput | FailedOutput
