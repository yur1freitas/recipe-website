import z from 'zod'

import { ValueObject, ZodValidator } from '@core/shared'

export const $measureSchema = z
    .string()
    .trim()
    .nonempty('A medida não pode ser vazia')
    .transform((e) => e.replace(/\s+/g, ' '))

export const MeasureValidator = new ZodValidator($measureSchema)

export class Measure extends ValueObject<string> {
    constructor(value: string) {
        super(MeasureValidator, value)
    }
}
