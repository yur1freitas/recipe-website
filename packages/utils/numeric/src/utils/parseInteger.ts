import { NumericError } from '~/error'
import { NumericType } from '~/consts'

import { isInt } from './isInt'

export type ParseIntegerInput = string

export interface ParseIntegerOutput {
    type: NumericType.INT
    input: string
    value: number
}

export function parseInteger(input: string): ParseIntegerOutput {
    if (!isInt(input)) {
        throw new NumericError({
            code: 'INVALID_INTEGER',
            message: 'A entrada fornecida não é um número inteiro'
        })
    }

    const value = parseInt(input, 10)

    return {
        type: NumericType.INT,
        input,
        value
    }
}
