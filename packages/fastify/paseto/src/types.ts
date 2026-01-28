export interface SuccessOutput {
    valid: true
    token: string
    payload: object
    error: null
}

export interface FailedOutput {
    valid: false
    token: null
    payload: null
    error: Error | null
}

export type Output = SuccessOutput | FailedOutput
