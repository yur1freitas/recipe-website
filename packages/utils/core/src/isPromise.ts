import type { AnyObject } from './types'

export function isPromise(input: unknown): input is PromiseLike<unknown> {
    if (typeof input !== 'object' || Array.isArray(input) || input === null) {
        return false
    }

    return typeof (input as AnyObject).then === 'function'
}
