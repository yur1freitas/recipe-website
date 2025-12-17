export const findAndDelete = (target, predicate) => {
    const arr = [...target]
    const index = arr.findIndex(predicate)

    if (index >= 0) {
        arr.splice(index, 1)
    }

    return arr
}
