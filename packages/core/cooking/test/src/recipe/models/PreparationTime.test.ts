import { expect, it, describe, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randPreparationTime } from '~mocks/randPreparationTime'

import { PreparationTime } from '~/recipe/models/PreparationTime'

describe('PreparationTime', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar um tempo de preparo', () => {
        const input = randPreparationTime()
        const preparationTime = new PreparationTime(input)

        expect(preparationTime.value).toBe(input)
    })

    it('deve lançar um erro se o tempo de preparo não for maior que zero', () => {
        expect(() => {
            const input = randPreparationTime({ testCase: 'zero' })
            new PreparationTime(input)
        }).toThrowError('O tempo de preparo não pode ser nulo')

        expect(() => {
            const input = randPreparationTime({ testCase: 'negative' })
            new PreparationTime(input)
        }).toThrowError('O tempo de preparo não pode ser nulo')
    })

    it('deve retornar os milisegundos do tempo de preparo', () => {
        const input = randPreparationTime()
        const preparationTime = new PreparationTime(input)

        expect(preparationTime.ms).toBe(input.ms)
    })

    it('deve retornar os segundos do tempo de preparo', () => {
        const input = randPreparationTime()
        const preparationTime = new PreparationTime(input)

        expect(preparationTime.seconds).toBe(input.seconds)
    })

    it('deve retornar os minutos do tempo de preparo', () => {
        const input = randPreparationTime()
        const preparationTime = new PreparationTime(input)

        expect(preparationTime.minutes).toBe(input.minutes)
    })

    it('deve retornar as horas do tempo de preparo', () => {
        const input = randPreparationTime()
        const preparationTime = new PreparationTime(input)

        expect(preparationTime.hours).toBe(input.hours)
    })

    it('deve comparar se dois tempos de preparo são iguais', () => {
        const preparationTime = new PreparationTime(randPreparationTime())
        const samePreparationTime = new PreparationTime(preparationTime.value)
        const otherPreparationTime = new PreparationTime(randPreparationTime())

        expect(preparationTime.equals(preparationTime)).toBeTruthy()
        expect(preparationTime.equals(samePreparationTime)).toBeTruthy()
        expect(preparationTime.equals(otherPreparationTime)).toBeFalsy()
    })
})
