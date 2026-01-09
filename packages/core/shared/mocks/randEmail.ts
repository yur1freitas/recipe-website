import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandEmailOptions {
    testCase?:
        | 'missing-username'
        | 'missing-at-symbol'
        | 'missing-domain'
        | 'success'
}

const DEFAULT_OPTIONS: Required<RandEmailOptions> = {
    testCase: 'success'
}

export function randEmail(options?: RandEmailOptions): string {
    const { testCase } = { ...DEFAULT_OPTIONS, ...options }

    switch (testCase) {
        case 'missing-at-symbol': {
            return faker.internet.email().replace('@', '')
        }
        case 'missing-domain': {
            return faker.internet.email({ provider: '' })
        }
        case 'missing-username': {
            const domain = faker.internet.domainName()
            return `@${domain}`
        }
        default: {
            return faker.internet.email()
        }
    }
}
