import type { ParseNumericOutput } from './utils/parseNumeric'

import { parseNumeric } from './utils/parseNumeric'
import { getType } from './utils/getType'
import { NumericType } from './consts'
import { NumericError } from './error'

export class Numeric {
    private $type: NumericType
    private $value: string

    constructor(input: string) {
        const type = getType(input)

        if (type === NumericType.UNKNOWN) {
            throw new NumericError({
                code: 'INVALID_NUMERIC',
                message: 'A entrada fornecida não é um valor numérico'
            })
        }

        this.$type = type
        this.$value = input
    }

    get type(): NumericType {
        return this.$type
    }

    get value(): string {
        return this.$value
    }

    get isInt(): boolean {
        return this.$type === NumericType.INT
    }

    get isFloat(): boolean {
        return this.$type === NumericType.FLOAT
    }

    get isFraction(): boolean {
        return this.$type === NumericType.FRACTION
    }

    get isMixed(): boolean {
        return this.$type === NumericType.MIXED
    }

    get isZero(): boolean {
        return this.toNumber() === 0
    }

    get isPositive(): boolean {
        return this.toNumber() > 0
    }

    get isNegative(): boolean {
        return this.toNumber() < 0
    }

    parse(): ParseNumericOutput {
        return parseNumeric(this.$value)
    }

    toNumber(): number {
        const { value } = parseNumeric(this.$value)

        return value
    }
}
