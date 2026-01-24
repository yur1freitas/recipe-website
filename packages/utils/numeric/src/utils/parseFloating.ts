import { NumericError } from '~/error'
import { NumericType } from '~/consts'

import { isFloat } from './isFloat'

export type ParseFloatingInput = string

export interface ParseFloatingOutput {
    type: NumericType.FLOAT
    input: string
    value: number
}

export function parseFloating(input: string): ParseFloatingOutput {
    if (!isFloat(input)) {
        throw new NumericError({
            code: 'INVALID_FLOATING',
            message: 'A entrada fornecida não é um número ponto flutuante'
        })
    }

    const value = parseFloat(input)

    return {
        type: NumericType.FLOAT,
        input,
        value
    }
}
