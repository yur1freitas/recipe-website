import { faker } from '@faker-js/faker/locale/pt_BR'

import { randInt } from './randInt'

export function randMixed(): string {
    const numerator = faker.number.int({ min: 0, max: 100 })
    const denominator = faker.number.int({ min: 1, max: 100 })

    return `${randInt()} ${numerator}/${denominator}`
}
