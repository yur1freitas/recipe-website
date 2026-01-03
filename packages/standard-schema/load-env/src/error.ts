export interface StandardSchemaLoadEnvErrorInput {
    code: string
    message: string
    cause?: unknown
}

export class StandardSchemaLoadEnvError extends Error {
    readonly code: string
    override readonly message: string

    constructor({ code, message, cause }: StandardSchemaLoadEnvErrorInput) {
        super()

        this.code = code
        this.message = message
        this.cause = cause
        this.name = this.constructor.name
    }
}
