import type { AnyObject } from './types'

export function pickProps<
    TObject extends AnyObject,
    TKeys extends keyof TObject
>(object: TObject, keys: TKeys[]): Pick<TObject, TKeys> {
    const out: AnyObject = {}

    for (const key of keys) {
        if (Object.hasOwn(object, key)) {
            const value = object[key]

            if (typeof value !== 'undefined') {
                out[key] = value
            }
        }
    }

    return out as TObject
}
