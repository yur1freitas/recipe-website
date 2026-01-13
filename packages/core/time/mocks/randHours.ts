import { faker } from '@faker-js/faker/locale/pt_BR'

import { MAX_AMOUNT_IN_MS } from '~/constants'

export function randHours(): number {
    return faker.number.int(MAX_AMOUNT_IN_MS - 1)
}
