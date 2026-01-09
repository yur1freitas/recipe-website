import { faker } from '@faker-js/faker/locale/pt_BR'

export interface RandPasswordOptions {
    testCase?:
        | 'shorter'
        | 'missing-lowercase-letter'
        | 'missing-uppercase-letter'
        | 'missing-number'
        | 'success'
    length?: number
}

const DEFAULT_OPTIONS: Required<RandPasswordOptions> = {
    testCase: 'success',
    length: 8
}

export function randPassword(options?: RandPasswordOptions): string {
    const { testCase, length } = { ...DEFAULT_OPTIONS, ...options }

    const build = (components: string[]) =>
        faker.helpers.shuffle(components).join('')

    switch (testCase) {
        case 'shorter': {
            return build([
                faker.string.numeric(),
                faker.string.alpha({ casing: 'lower' }),
                faker.string.alpha({ casing: 'upper' }),
                faker.internet.password({ length: faker.number.int(4) })
            ])
        }
        case 'missing-lowercase-letter': {
            return build([
                faker.string.numeric(),
                faker.string.alpha({ casing: 'upper' }),
                faker.internet.password({ length: length - 2 }).toUpperCase()
            ])
        }
        case 'missing-uppercase-letter': {
            return build([
                faker.string.numeric(),
                faker.string.alpha({ casing: 'lower' }),
                faker.internet.password({ length: length - 2 }).toLowerCase()
            ])
        }
        case 'missing-number': {
            return build([
                faker.string.alpha({ casing: 'lower' }),
                faker.string.alpha({ casing: 'upper' }),
                faker.internet.password({
                    length: length - 2,
                    pattern: /[^\d]+/g
                })
            ])
        }
        default: {
            if (length < 8) {
                throw new Error(
                    'Não é possível gerar uma senha válida com menos de 8 caracteres'
                )
            }

            return build([
                faker.string.numeric(),
                faker.string.alpha({ casing: 'lower' }),
                faker.string.alpha({ casing: 'upper' }),
                faker.internet.password({ length: length - 3 })
            ])
        }
    }
}
