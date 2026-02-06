import type { StandardSchemaV1 as StandardSchema } from '@standard-schema/spec'

import { isPromise } from '@utils/core/isPromise'

import { CustomError } from '~/errors/CustomError'

import type { ParseOutput } from './Validator'

import { Validator } from './Validator'

export class StandardValidator<T> extends Validator<T> {
    constructor(protected schema: StandardSchema<T>) {
        super()
    }

    protected parse(value: T): ParseOutput<T> {
        const out = this.schema['~standard'].validate(value)

        if (isPromise(out)) {
            throw new CustomError({
                code: 'PROMISE_NOT_SUPPORTED',
                message: 'Validadores assíncronos não são suportadas'
            })
        }

        if (out.issues) {
            const error = out.issues[0] as { code?: string; message: string }

            if (typeof error?.code === 'string') {
                return { error: { code: error.code, message: error.message } }
            }

            return { error: { code: 'unknown', message: error.message } }
        }

        return { data: out.value }
    }
}
