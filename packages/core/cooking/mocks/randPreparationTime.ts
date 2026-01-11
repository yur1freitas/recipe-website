import { faker } from '@faker-js/faker/locale/pt_BR'

import { Time } from '@core/time'

export interface RandPreparationTime {
    testCase?: 'negative' | 'zero' | 'success'
}

export function randPreparationTime(options?: RandPreparationTime): Time {
    switch (options?.testCase) {
        case 'zero': {
            return new Time({ ms: 0 })
        }
        case 'negative': {
            const ms = faker.number.float({ min: -100, max: -1 })
            return new Time({ ms })
        }
        default: {
            const ms = faker.number.float({ min: 1, max: 1e6 })
            return new Time({ ms })
        }
    }
}
