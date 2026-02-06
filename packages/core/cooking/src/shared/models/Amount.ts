import z from 'zod'

import { ValueObject, StandardValidator } from '@core/shared'

export const amountSchema = z
    .number('A quantidade deve ser um número')
    .min(1, 'A quantidade deve ser no mínimo 1')
    .int('A quantidade deve ser um valor inteiro')
    .meta({
        examples: [1, 30, 10]
    })

export const AmountValidator = new StandardValidator(amountSchema)

export class Amount extends ValueObject<number> {
    constructor(value: number) {
        super(AmountValidator, value)
    }
}
