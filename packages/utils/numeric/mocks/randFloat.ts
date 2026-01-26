import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandFloatOptions {
    testCase?: 'zero' | 'negative' | 'positive' | 'any'
}

export function randFloat(options?: RandFloatOptions): string {
    switch (options?.testCase) {
        case 'zero': {
            return '0.0'
        }
        case 'negative': {
            const whole = faker.number.int({ min: 0, max: 100 })
            const float = faker.number.int({ min: 1, max: 100 })

            return `-${whole}.${float}`
        }
        case 'positive': {
            const whole = faker.number.int({ min: 0, max: 100 })
            const float = faker.number.int({ min: 1, max: 100 })

            return `${whole}.${float}`
        }
        default: {
            const whole = faker.number.int({ min: -100, max: 100 })
            const float = faker.number.int({ min: 1, max: 100 })

            return `${whole}.${float}`
        }
    }
}
