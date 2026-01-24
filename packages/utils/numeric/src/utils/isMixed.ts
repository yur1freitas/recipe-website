import { MIXED_REGEX } from '~/consts'

export function isMixed(input: string): boolean {
    return MIXED_REGEX.test(input)
}
