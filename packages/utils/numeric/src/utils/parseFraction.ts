import { NumericError } from '~/error'
import { NumericType } from '~/consts'

import { isFraction } from './isFraction'

export type ParseFractionInput = string

export interface ParseFractionOutput {
    type: NumericType.FRACTION
    input: string
    value: number
    numerator: number
    denominator: number
}

export function parseFraction(input: ParseFractionInput): ParseFractionOutput {
    if (!isFraction(input)) {
        throw new NumericError({
            code: 'INVALID_FRACTION',
            message: 'A entrada fornecida não é uma fração'
        })
    }

    const [strNumerator, strDenominator] = input.split('/')

    const numerator = parseFloat(strNumerator)
    const denominator = parseFloat(strDenominator)

    const value = numerator / denominator

    return {
        type: NumericType.FRACTION,
        value,
        input,
        numerator,
        denominator
    }
}
