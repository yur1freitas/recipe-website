import { randNumeric } from '@utils/numeric/mocks'
import { Numeric } from '@utils/numeric'

export interface RandMeasureOptions {
    testCase?: 'zero' | 'negative' | 'success'
}

export function randMeasure(options?: RandMeasureOptions): Numeric {
    switch (options?.testCase) {
        case 'zero': {
            return new Numeric('0')
        }
        case 'negative': {
            return new Numeric(randNumeric({ testCase: 'negative' }))
        }
        default: {
            return new Numeric(randNumeric({ testCase: 'positive' }))
        }
    }
}
