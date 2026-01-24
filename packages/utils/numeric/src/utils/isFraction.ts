import { FRACTION_REGEX } from '~/consts'

export function isFraction(input: string): boolean {
    return FRACTION_REGEX.test(input)
}
