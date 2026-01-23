export function arraySwap<T>(array: T[], from: number, to: number): T[] {
    const copiedArray = array.slice()

    ;[copiedArray[from], copiedArray[to]] = [copiedArray[to], copiedArray[from]]

    return copiedArray
}
