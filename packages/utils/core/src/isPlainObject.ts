import type { AnyObject } from './types'

export function isPlainObject(input: unknown): input is AnyObject {
    if (typeof input !== 'object' || Array.isArray(input) || input === null) {
        return false
    }

    const proto = Object.getPrototypeOf(input)

    return proto === Object.prototype || proto === null
}
