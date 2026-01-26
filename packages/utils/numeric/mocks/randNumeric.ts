import { faker } from '@faker-js/faker/locale/pt_BR'

import { randFraction } from './randFraction'
import { randFloat } from './randFloat'
import { randMixed } from './randMixed'
import { randInt } from './randInt'

export interface RandNumericOptions {
    testCase?: 'negative' | 'positive' | 'any'
}

export function randNumeric(options?: RandNumericOptions): string {
    return faker.helpers.arrayElement([
        randInt,
        randFloat,
        randFraction,
        randMixed
    ])(options)
}
