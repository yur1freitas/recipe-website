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

    it.each([
        [1, 1],
        [300, 300],
        [1_000, 0]
    ])('deve retornar os milisegundos do tempo de preparo', (ms, _ms) => {
        const preparationTime = new PreparationTime(ms)
        expect(preparationTime.ms).toBe(_ms)
    })

    it.each([
        [1_000, 1],
        [60_000, 0],
        [30_000, 30]
    ])('deve retornar os segundos do tempo de preparo', (ms, seconds) => {
        const preparationTime = new PreparationTime(ms)
        expect(preparationTime.seconds).toBe(seconds)
    })

    it.each([
        [3_600_000, 0],
        [60_000, 1],
        [300_000, 5]
    ])('deve retornar os minutos do tempo de preparo', (ms, minutes) => {
        const preparationTime = new PreparationTime(ms)
        expect(preparationTime.minutes).toBe(minutes)
    })

    it.each([
        [86_400_000, 0],
        [18_000_000, 5],
        [3_600_000, 1]
    ])('deve retornar as horas do tempo de preparo', (ms, hours) => {
        const preparationTime = new PreparationTime(ms)
        expect(preparationTime.hours).toBe(hours)
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
