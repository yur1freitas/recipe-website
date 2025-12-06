export interface CustomErrorInput {
    code: string
    message: string
}

export class CustomError extends Error {
    readonly code: string
    override readonly message: string

    constructor({ code, message }: CustomErrorInput) {
        super()

        this.code = code
        this.message = message
        this.name = this.constructor.name
    }

    get props(): CustomErrorInput {
        return {
            code: this.code,
            message: this.message
        }
    }

    static isError(target: unknown): target is CustomError {
        return target instanceof CustomError && target.name === this.name
    }
}
