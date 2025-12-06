import { ValidatorError } from '../errors/ValidatorError'

export interface ParseError {
    code: string
    message: string
}

export type ParseOutput<T> = {
    data?: undefined
    error: ParseError
} | {
    data: T
    error?: undefined
}

export abstract class Validator<T> {
    protected abstract parse(value?: T): ParseOutput<T>

    execute(value?: T): T {
        const { data, error } = this.parse(value)

        if (error) {
            throw new ValidatorError(error)
        }

        return data
    }
}
