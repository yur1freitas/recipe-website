import { faker } from '@faker-js/faker/locale/pt_BR'

export type RandOrderOptions =
    | { testCase: 'negative' | 'float' | 'less-than-one' }
    | { testCase?: 'success'; max?: number }

export function randOrder(options?: RandOrderOptions): number {
    switch (options?.testCase) {
        case 'negative': {
            return faker.number.int({ min: -100, max: -1 })
        }
        case 'float': {
            return faker.number.float({ min: 1, max: 100 })
        }
        case 'less-than-one': {
            return faker.number.float({ min: 0, max: 1 - 0.1 })
        }
        default: {
            const max = options?.max ?? 10
            return faker.number.int({ min: 1, max })
        }
    }
}
