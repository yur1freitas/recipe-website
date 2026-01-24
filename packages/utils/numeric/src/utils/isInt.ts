import { INT_REGEX } from '~/consts'

export function isInt(input: string): boolean {
    return INT_REGEX.test(input)
}
