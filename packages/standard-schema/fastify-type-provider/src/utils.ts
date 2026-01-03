export function hasProperty<K extends string>(
    target: unknown,
    key: K
): target is { [P in K]: unknown } {
    return Object.prototype.hasOwnProperty.call(target, key)
}

export function isPromise(target: unknown): target is PromiseLike<unknown> {
    return (
        typeof target === 'object' &&
        target !== null &&
        hasProperty(target, 'then') &&
        typeof target.then === 'function'
    )
}

export function isObject(target: unknown): target is Record<string, unknown> {
    return (
        typeof target === 'object' &&
        target !== null &&
        Object.prototype.toString.call(target) === '[object Object]'
    )
}
