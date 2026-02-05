import { randNumeric } from '@utils/numeric/mocks'

export interface RandMeasureOptions {
    testCase?: 'zero' | 'negative' | 'success'
}

export function randMeasure(options?: RandMeasureOptions): string {
    switch (options?.testCase) {
        case 'zero': {
            return '0'
        }
        case 'negative': {
            return randNumeric({ testCase: 'negative' })
        }
        default: {
            return randNumeric({ testCase: 'positive' })
        }
    }
}
