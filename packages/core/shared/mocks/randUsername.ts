import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandUsernameOptions {
    testCase?: 'shorter' | 'larger' | 'invalid-chars' | 'success'
}

const DEFAULT_OPTIONS: Required<RandUsernameOptions> = {
    testCase: 'success'
}

export function randUsername(options?: RandUsernameOptions): string {
    const { testCase } = { ...DEFAULT_OPTIONS, ...options }

    switch (testCase) {
        case 'shorter': {
            return faker.person.firstName().slice(0, 2)
        }
        case 'larger': {
            const sex = faker.person.sexType()
            const amount = faker.number.int({ min: 10, max: 20 })

            const names = [
                faker.person.firstName(sex),
                ...faker.helpers.multiple(() => faker.person.middleName(sex), {
                    count: amount
                }),
                ...faker.helpers.multiple(() => faker.person.lastName(sex), {
                    count: amount
                })
            ]

            return names.join(' ')
        }
        case 'invalid-chars': {
            const base = faker.internet.username()
            const extra = faker.helpers.arrayElement([
                faker.helpers.arrayElement(['*', '_', '+', '(', ')']),
                faker.internet.emoji()
            ])

            return `${base}${extra}`
        }
        default: {
            return faker.internet.username().replace(/[^\p{L}\d\s-]+/iu, '')
        }
    }
}
