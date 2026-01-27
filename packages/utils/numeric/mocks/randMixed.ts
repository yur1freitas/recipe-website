import { randInt } from './randInt'
import { randFraction } from './randFraction'

export interface RandMixedOptions {
    testCase?: 'denominator-zero' | 'negative' | 'positive' | 'any'
}

export function randMixed(options?: RandMixedOptions): string {
    switch (options?.testCase) {
        case 'denominator-zero': {
            return `${randInt()} ${randInt({ testCase: 'positive' })}/0`
        }
        case 'negative': {
            return `${randInt({ testCase: 'negative' })} ${randFraction({ testCase: 'positive' })}`
        }
        case 'positive': {
            return `${randInt({ testCase: 'positive' })} ${randFraction({ testCase: 'positive' })}`
        }
        default: {
            return `${randInt()} ${randFraction({ testCase: 'positive' })}`
        }
    }
}
