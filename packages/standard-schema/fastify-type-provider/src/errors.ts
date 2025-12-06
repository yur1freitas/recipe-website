export interface StandardSchemaTypeProviderErrorInput {
    code: string
    message: string
    cause?: unknown
}

export class StandardSchemaTypeProviderError extends Error {
    readonly code: string
    override readonly message: string

    constructor(
        { code, message, cause }: StandardSchemaTypeProviderErrorInput
    ) {
        super()

        this.code = code
        this.message = message
        this.cause = cause
        this.name = this.constructor.name
    }
}
