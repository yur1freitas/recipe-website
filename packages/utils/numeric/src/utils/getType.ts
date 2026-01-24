import { NumericType } from '~/consts'

import { isFraction } from './isFraction'
import { isFloat } from './isFloat'
import { isMixed } from './isMixed'
import { isInt } from './isInt'

export function getType(input: string): NumericType {
    if (isInt(input)) {
        return NumericType.INT
    }

    if (isFloat(input)) {
        return NumericType.FLOAT
    }

    if (isFraction(input)) {
        return NumericType.FRACTION
    }

    if (isMixed(input)) {
        return NumericType.MIXED
    }

    return NumericType.UNKNOWN
}
