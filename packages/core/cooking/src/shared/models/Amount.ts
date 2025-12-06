import z from 'zod'

import { ValueObject, ZodValidator } from '@core/shared'

export const $amountSchema = z
    .number('A quantidade deve ser um número')
    .min(1, 'A quantidade deve ser no mínimo 1')
    .int('A quantidade deve ser um valor inteiro')

export const AmountValidator = new ZodValidator($amountSchema)

export class Amount extends ValueObject<number> {
    constructor(value: number) {
        super(AmountValidator, value)
    }
}
