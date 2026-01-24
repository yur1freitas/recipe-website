import { NumericError } from '~/error'
import { NumericType } from '~/consts'

import type { ParseFractionOutput } from './parseFraction'
import type { ParseIntegerOutput } from './parseInteger'

import { parseFraction } from './parseFraction'
import { parseInteger } from './parseInteger'
import { isMixed } from './isMixed'

export type ParseMixedInput = string

export interface ParseMixedOutput {
    type: NumericType.MIXED
    input: string
    value: number
    whole: ParseIntegerOutput
    fraction: ParseFractionOutput
}

export function parseMixed(input: string): ParseMixedOutput {
    if (!isMixed(input)) {
        throw new NumericError({
            code: 'INVALID_MIXED_NUMBER',
            message: 'A entrada fornecida não é um número misto'
        })
    }

    const [strWhole, strFraction] = input.split(' ')

    const whole = parseInteger(strWhole)
    const fraction = parseFraction(strFraction)

    const value =
        whole.value < 0
            ? -(Math.abs(whole.value) + fraction.value)
            : whole.value + fraction.value

    return {
        type: NumericType.MIXED,
        input,
        value,
        whole,
        fraction
    }
}
