export function arrayInsert<T>(array: T[], index: number, value: T): T[] {
    return array.toSpliced(index, 0, value)
}
