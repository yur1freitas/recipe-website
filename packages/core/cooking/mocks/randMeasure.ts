import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandMeasureOptions {
    testCase?: 'empty' | 'success'
}

export function randMeasure(options?: RandMeasureOptions): string {
    switch (options?.testCase) {
        case 'empty': {
            const length = faker.number.int({ min: 0, max: 100 })
            return ' '.repeat(length)
        }
        default: {
            return faker.string.numeric()
        }
    }
}
