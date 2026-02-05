import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandPreparationTime {
    testCase?: 'negative' | 'zero' | 'success'
}

export function randPreparationTime(options?: RandPreparationTime): number {
    switch (options?.testCase) {
        case 'zero': {
            return 0
        }
        case 'negative': {
            return faker.number.float({ min: -100, max: -1 })
        }
        default: {
            return faker.number.float({ min: 1, max: 1e6 })
        }
    }
}
