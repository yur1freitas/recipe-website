import { faker } from '@faker-js/faker/locale/pt_BR'

import { MAX_AMOUNT_IN_DAYS } from '~/constants'

export function randDays(): number {
    return faker.number.int(MAX_AMOUNT_IN_DAYS - 1)
}
