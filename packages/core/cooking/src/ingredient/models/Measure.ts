import z from 'zod'
import { Numeric } from '@utils/numeric'

import { ValueObject, ZodValidator } from '@core/shared'

export const measureSchema = z
    .instanceof(Numeric)
    .refine(
        (measure) => measure.toNumber() > 0,
        'A medida deve ser maior que zero'
    )

export const MeasureValidator = new ZodValidator(measureSchema)

export class Measure extends ValueObject<Numeric> {
    constructor(value: Numeric) {
        super(MeasureValidator, value)
    }

    get isInt(): boolean {
        return this.value.isInt
    }

    get isFloat(): boolean {
        return this.value.isFloat
    }

    get isFraction(): boolean {
        return this.value.isFraction
    }

    get isMixed(): boolean {
        return this.value.isMixed
    }

    toNumber(): number {
        return this.value.toNumber()
    }
}
