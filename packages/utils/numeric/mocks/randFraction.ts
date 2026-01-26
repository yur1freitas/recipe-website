import { faker } from '@faker-js/faker/locale/pt_BR'

export function randFraction(): string {
    const numerator = faker.number.int({ min: -100, max: 100 })

    const denominator = faker.helpers.arrayElement([
        faker.number.int({ min: 1, max: 100 }),
        faker.number.int({ min: -100, max: -1 })
    ])

    return `${numerator}.${denominator}`
}
