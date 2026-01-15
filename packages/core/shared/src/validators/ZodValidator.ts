import type { z } from 'zod'

import type { ParseOutput } from './Validator'

import { Validator } from './Validator'

export class ZodValidator<T> extends Validator<T> {
    constructor(protected schema: z.ZodType<T>) {
        super()
    }

    protected parse(value: T): ParseOutput<T> {
        const { success, data, error } = this.schema.safeParse(value)

        if (!success) {
            const { code, message } = error.issues[0]

            return {
                error: {
                    code,
                    message
                }
            }
        }

        return { data }
    }
}
