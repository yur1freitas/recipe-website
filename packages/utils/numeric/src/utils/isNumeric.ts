import { isMixed } from './isMixed'
import { isInt } from './isInt'
import { isFraction } from './isFraction'
import { isFloat } from './isFloat'

export function isNumeric(input: string): boolean {
    return isInt(input) || isFloat(input) || isFraction(input) || isMixed(input)
}
