export function arrayRemove<T>(array: T[], index: number): T[] {
    return array.toSpliced(index, 1)
}
