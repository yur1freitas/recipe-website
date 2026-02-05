import z from 'zod'
import { isNumeric, Numeric, parseNumeric } from '@utils/numeric'

import { ValueObject, ZodValidator } from '@core/shared'

export const measureSchema = z
    .string()
    .trim()
    .nonempty('A medida não pode ser vazia')
    .refine(
        (measure) => isNumeric(measure),
        'A medida deve ser um valor numérico'
    )
    .refine(
        (measure) => parseNumeric(measure).value > 0,
        'A medida deve ser maior que zero'
    )
    .meta({
        examples: ['1/2', '3.14', '3 1/2', '5']
    })

export const MeasureValidator = new ZodValidator(measureSchema)

export class Measure extends ValueObject<string> {
    protected $numeric: Numeric

    constructor(value: string) {
        super(MeasureValidator, value)

        this.$numeric = new Numeric(this.value)
    }

    get isInt(): boolean {
        return this.$numeric.isInt
    }

    get isFloat(): boolean {
        return this.$numeric.isFloat
    }

    get isFraction(): boolean {
        return this.$numeric.isFraction
    }

    get isMixed(): boolean {
        return this.$numeric.isMixed
    }

    toNumber(): number {
        return this.$numeric.toNumber()
    }
}
