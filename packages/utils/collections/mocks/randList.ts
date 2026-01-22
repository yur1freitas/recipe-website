import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandListOptions {
    length?: number
    unique?: boolean
}

const DEFAULT_OPTIONS: Required<RandListOptions> = {
    length: 10,
    unique: false
}

export function randList(options?: RandListOptions): string[] {
    const { length, unique } = { ...DEFAULT_OPTIONS, ...options }

    const method = faker.helpers.arrayElement([
        () => faker.book.title(),
        () => faker.word.words(),
        () => faker.food.fruit(),
        () => faker.animal.bird()
    ])

    if (unique) {
        return faker.helpers.uniqueArray(method, length)
    }

    return faker.helpers.multiple(method, { count: length })
}
