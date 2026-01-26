import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandIntOptions {
    testCase?: 'zero' | 'negative' | 'positive' | 'any'
}

export function randInt(options?: RandIntOptions): string {
    switch (options?.testCase) {
        case 'zero': {
            return '0'
        }
        case 'negative': {
            return `-${faker.number.int({ min: 1, max: 100 })}`
        }
        case 'positive': {
            return `${faker.number.int({ min: 1, max: 100 })}`
        }
        default: {
            return `${faker.number.int({ min: -100, max: 100 })}`
        }
    }
}
