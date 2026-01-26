import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandFractionOptions {
    testCase?: 'denominator-zero' | 'negative' | 'positive' | 'any'
}

export function randFraction(options?: RandFractionOptions): string {
    switch (options?.testCase) {
        case 'denominator-zero': {
            const numerator = faker.number.int({ min: -100, max: 100 })
            const denominator = '0'

            return `${numerator}/${denominator}`
        }
        case 'negative': {
            const [a, b] = faker.helpers.multiple(
                () => faker.number.int({ min: 1, max: 100 }),
                { count: 2 }
            )

            return faker.helpers.shuffle([-a, b]).join('/')
        }
        case 'positive': {
            return faker.helpers
                .multiple(() => faker.number.int({ min: 1, max: 100 }), {
                    count: 2
                })
                .join('/')
        }
        default: {
            const numerator = faker.number.int({ min: -100, max: 100 })

            const denominator = faker.helpers.arrayElement([
                faker.number.int({ min: 1, max: 100 }),
                faker.number.int({ min: -100, max: -1 })
            ])

            return `${numerator}/${denominator}`
        }
    }
}
