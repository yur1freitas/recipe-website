export type AnyObject = Record<PropertyKey, any>

export type WithKey<T, K extends PropertyKey> = T & { [P in K]: unknown }

export function hasProperty<
    TObject extends AnyObject,
    TKey extends PropertyKey
>(object: TObject, key: TKey): object is WithKey<TObject, TKey> {
    return Object.hasOwn(object, key)
}
