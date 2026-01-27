import { faker } from '@faker-js/faker/locale/pt_BR'

import { randMixed } from './randMixed'
import { randInt } from './randInt'
import { randFraction } from './randFraction'
import { randFloat } from './randFloat'

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
