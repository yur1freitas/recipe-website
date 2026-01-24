export const INT_REGEX = /^[+-]?\d+$/

export const FLOAT_REGEX = /^[+-]?\d+(?:\.\d+)?$/

export const FRACTION_REGEX = /^[+-]?\d+(?:\.\d+)?\/[+-]?[1-9]\d*(?:\.\d+)?$/

export const MIXED_REGEX =
    /^[+-]?\d+(?:\.\d+)?\s\d+(?:\.\d+)?\/[1-9]\d*(?:\.\d+)?$/

export const enum NumericType {
    INT = 'int',
    FLOAT = 'float',
    FRACTION = 'fraction',
    MIXED = 'mixed',
    UNKNOWN = 'unknown'
}
