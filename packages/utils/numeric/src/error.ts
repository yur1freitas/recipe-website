export interface NumericErrorInput {
    code: string
    message: string
}

export class NumericError extends Error {
    readonly code: string
    override readonly message: string

    constructor({ code, message }: NumericErrorInput) {
        super()

        this.code = code
        this.message = message
        this.name = this.constructor.name
    }
}
