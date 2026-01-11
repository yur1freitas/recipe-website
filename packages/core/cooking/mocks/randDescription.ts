import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandDescriptionOptions {
    testCase?: 'empty' | 'larger' | 'invalid-char' | 'success'
}

export function randDescription(options?: RandDescriptionOptions): string {
    switch (options?.testCase) {
        case 'empty': {
            const length = faker.number.int({ min: 0, max: 100 })
            return ' '.repeat(length)
        }
        case 'larger': {
            const amount = faker.number.int({ min: 5, max: 10 })
            const descriptions = faker.helpers.multiple(
                () => faker.food.description(),
                { count: amount }
            )

            return descriptions.join(' ')
        }
        case 'invalid-char': {
            const name = faker.food.description()

            const extra = faker.helpers.arrayElement([
                faker.helpers.arrayElement(['*', '_', '+', '(', ')']),
                faker.internet.emoji()
            ])

            return `${name}${extra}`
        }
        default: {
            return faker.food.description()
        }
    }
}
