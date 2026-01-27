import { NumericType } from '~/consts'

import { isMixed } from './isMixed'
import { isInt } from './isInt'
import { isFraction } from './isFraction'
import { isFloat } from './isFloat'

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
