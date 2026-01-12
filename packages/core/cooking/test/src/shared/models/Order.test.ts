import { expect, it, describe, afterEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { Order } from '~/shared/models/Order'

import { randOrder } from '~mocks/randOrder'

describe('Order', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma ordem', () => {
        const input = randOrder()
        const order = new Order(input)

        expect(order.value).toBe(input)
    })

    it('deve lançar um erro se a quantidade for menor que 1', () => {
        const input = randOrder({ testCase: 'less-than-one' })

        expect(() => new Order(input)).toThrowError(
            'O menor índice possível é 1'
        )
    })

    it('deve lançar um erro se a quantidade for negativa', () => {
        const input = randOrder({ testCase: 'negative' })

        expect(() => new Order(input)).toThrowError(
            'O menor índice possível é 1'
        )
    })

    it('deve lançar um erro se a quantidade não for um número inteiro', () => {
        const input = randOrder({ testCase: 'float' })

        expect(() => new Order(input)).toThrowError(
            'O índice da ordem deve ser um valor inteiro'
        )
    })
})
