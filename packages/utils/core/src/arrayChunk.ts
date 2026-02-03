export function arrayChunk<T>(array: T[], size: number): T[][] {
    const copy = array.slice(0)

    if (size < 1 || !Number.isSafeInteger(size)) return [copy]

    const length = Math.ceil(copy.length / size)

    return [...Array(length)].map((_) => copy.splice(0, size))
}
