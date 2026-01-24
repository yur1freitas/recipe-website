import { FLOAT_REGEX } from '~/consts'

export function isFloat(input: string): boolean {
    return FLOAT_REGEX.test(input)
}
