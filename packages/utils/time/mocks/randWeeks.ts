import { faker } from '@faker-js/faker/locale/pt_BR'

import { MAX_AMOUNT_IN_WEEKS } from '~/constants'

export function randWeeks(): number {
    return faker.number.int(MAX_AMOUNT_IN_WEEKS - 1)
}
