export class List<T> implements Iterable<T> {
    private $store: T[]

    constructor(input: Iterable<T> | ArrayLike<T> = []) {
        this.$store = Array.from(input)
    }

    get length() {
        return this.$store.length
    }

    get keys() {
        return this.$store.keys()
    }

    get values() {
        return this.$store.values()
    }

    toArray(): Readonly<T>[] {
        return [...this.$store]
    }

    get(index: number): Readonly<T> | null {
        if (this.isNotInBounds(index)) return null

        return this.$store[index]
    }

    push(...values: T[]): List<T> {
        const input = [...this.$store, ...values]
        return new List(input)
    }

    add(...values: T[]): List<T> {
        const input = new Set([...this.$store, ...values])
        return new List(input)
    }

    insert(index: number, value: T): List<T> {
        if (this.isNotInBounds(index)) return this

        const input = this.toArray()
        input.splice(index, 0, value)

        return new List(input)
    }

    set(index: number, value: T): List<T> {
        if (this.isNotInBounds(index)) return this

        const input = this.toArray()
        input[index] = value

        return new List(input)
    }

    drop(index: number): List<T> {
        if (this.isNotInBounds(index)) return this

        const input = this.toArray()
        input.splice(index, 1)

        return new List(input)
    }

    swap(from: number, to: number): List<T> {
        if (this.isNotInBounds(from) || this.isNotInBounds(to)) return this

        const input = this.toArray()
        ;[input[from], input[to]] = [input[to], input[from]]

        return new List(input)
    }

    move(from: number, to: number) {
        if (this.isNotInBounds(from) || this.isNotInBounds(to)) return this

        const input = this.toArray()

        const [value] = input.splice(from, 1)
        input.splice(to, 0, value)

        return new List(input)
    }

    map<V>(fn: (value: T, i: number) => V): List<V> {
        const input = this.$store.map(fn)
        return new List(input)
    }

    filter(fn: (value: Readonly<T>, i: number) => boolean): List<T> {
        const input = this.$store.filter(fn)
        return new List(input)
    }

    find(fn: (value: Readonly<T>, i: number) => unknown): Readonly<T> | null {
        return this.$store.find(fn) ?? null
    }

    findIndex(fn: (value: Readonly<T>, i: number) => T): number {
        return this.$store.findIndex(fn)
    }

    sort(fn: (a: Readonly<T>, b: Readonly<T>) => number): List<T> {
        const input = this.$store.sort(fn)
        return new List(input)
    }

    isInBounds(index: number): boolean {
        return index >= 0 && index < this.length
    }

    isNotInBounds(index: number): boolean {
        return index < 0 || index >= this.length
    }

    *[Symbol.iterator](): Iterator<T, any, any> {
        for (const value of this.$store) {
            yield value
        }
    }
}
