import { NumericError } from '~/error'
import { NumericType } from '~/consts'

import type { ParseFractionOutput } from './parseFraction'
import type { ParseFloatingOutput } from './parseFloating'
import type { ParseIntegerOutput } from './parseInteger'
import type { ParseMixedOutput } from './parseMixed'

import { parseFraction } from './parseFraction'
import { parseFloating } from './parseFloating'
import { parseInteger } from './parseInteger'
import { parseMixed } from './parseMixed'
import { getType } from './getType'

export type ParseNumericInput = string

export type ParseNumericOutput =
    | ParseIntegerOutput
    | ParseFloatingOutput
    | ParseFractionOutput
    | ParseMixedOutput

export function parseNumeric(input: string): ParseNumericOutput {
    const type = getType(input)

    switch (type) {
        case NumericType.INT:
            return parseInteger(input)
        case NumericType.FLOAT:
            return parseFloating(input)
        case NumericType.FRACTION:
            return parseFraction(input)
        case NumericType.MIXED:
            return parseMixed(input)
        case NumericType.UNKNOWN:
            throw new NumericError({
                code: 'NUMERIC_PARSING_ERROR',
                message: 'A entrada deve ser uma string numérica válida'
            })
    }
}
