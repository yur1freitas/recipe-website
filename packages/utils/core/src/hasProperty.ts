import type { AnyObject, WithKey } from './types'

export function hasProperty<
    TObject extends AnyObject,
    TKey extends PropertyKey
>(object: TObject, key: TKey): object is WithKey<TObject, TKey> {
    return Object.hasOwn(object, key)
}
