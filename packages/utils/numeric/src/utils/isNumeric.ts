import { isFraction } from './isFraction'
import { isFloat } from './isFloat'
import { isMixed } from './isMixed'
import { isInt } from './isInt'

export function isNumeric(input: string): boolean {
    return isInt(input) || isFloat(input) || isFraction(input) || isMixed(input)
}
