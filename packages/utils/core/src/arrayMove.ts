export function arrayMove<T>(array: T[], from: number, to: number): T[] {
    const copiedArray = array.slice()

    const [value] = copiedArray.splice(from, 1)
    copiedArray.splice(to, 0, value)

    return copiedArray
}
