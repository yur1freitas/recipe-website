import { faker } from '@faker-js/faker/locale/pt_BR'

import { MAX_AMOUNT_IN_MINUTES } from '~/constants'

export function randMinutes(): number {
    return faker.number.int(MAX_AMOUNT_IN_MINUTES - 1)
}
