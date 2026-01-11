import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandNameOptions {
    testCase?: 'empty' | 'short' | 'larger' | 'invalid-chars' | 'success'
    type?: 'dish' | 'ingredient' | 'product'
}

export function randName(options?: RandNameOptions): string {
    const pickName = (): string => {
        switch (options?.type) {
            case 'product': {
                return faker.commerce.product()
            }
            case 'ingredient': {
                return faker.food.ingredient()
            }
            case 'dish': {
                return faker.food.dish()
            }
            default: {
                return faker.helpers.arrayElement([
                    faker.commerce.product(),
                    faker.food.ingredient(),
                    faker.food.dish()
                ])
            }
        }
    }

    switch (options?.testCase) {
        case 'empty': {
            const length = faker.number.int({ min: 0, max: 100 })
            return ' '.repeat(length)
        }
        case 'short': {
            return pickName().slice(0, 1)
        }
        case 'larger': {
            const amount = faker.number.int({ min: 10, max: 20 })
            const names = faker.helpers.multiple(pickName, { count: amount })

            return names.join(' ')
        }
        case 'invalid-chars': {
            const name = pickName()

            const extra = faker.helpers.arrayElement([
                faker.helpers.arrayElement(['*', '_', '+', '(', ')']),
                faker.internet.emoji()
            ])

            return `${name}${extra}`
        }
        default: {
            return pickName()
        }
    }
}
