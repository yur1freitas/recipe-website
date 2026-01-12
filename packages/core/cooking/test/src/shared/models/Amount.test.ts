import { expect, it, describe, afterEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { Amount } from '~/shared/models/Amount'

import { randAmount } from '~mocks/randAmount'

describe('Amount', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma quantidade', () => {
        const input = randAmount()
        const amount = new Amount(input)

        expect(amount.value).toBe(input)
    })

    it('deve lançar um erro se a quantidade for menor que 1', () => {
        const input = randAmount({ testCase: 'less-than-one' })

        expect(() => new Amount(input)).toThrowError(
            'A quantidade deve ser no mínimo 1'
        )
    })

    it('deve lançar um erro se a quantidade for negativa', () => {
        const input = randAmount({ testCase: 'negative' })

        expect(() => new Amount(input)).toThrowError(
            'A quantidade deve ser no mínimo 1'
        )
    })

    it('deve lançar um erro se a quantidade não for um número inteiro', () => {
        const input = randAmount({ testCase: 'float' })

        expect(() => new Amount(input)).toThrowError(
            'A quantidade deve ser um valor inteiro'
        )
    })
})
