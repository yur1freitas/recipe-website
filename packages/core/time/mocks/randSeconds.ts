import { faker } from '@faker-js/faker/locale/pt_BR'

import { MAX_AMOUNT_IN_SECONDS } from '~/constants'

export function randSeconds(): number {
    return faker.number.int(MAX_AMOUNT_IN_SECONDS - 1)
}
