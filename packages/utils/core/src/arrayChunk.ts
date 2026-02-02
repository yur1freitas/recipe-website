export function arrayChunk<T>(array: T[], size: number): T[][] {
    if (size < 1 || !Number.isSafeInteger(size)) return [array]

    const length = Math.ceil(array.length / size)

    return [...Array(length)].map((_) => array.splice(0, size))
}
