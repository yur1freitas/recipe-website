import { expect, it, describe, afterEach } from 'vitest'
import { Numeric } from '@utils/numeric'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randMeasure } from '~mocks/randMeasure'

import { Measure } from '~/ingredient/models/Measure'

describe('Measure', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma medida', () => {
        const input = randMeasure()
        const measure = new Measure(input)

        expect(measure.value).toBe(input)
    })

    it.each([
        ['1', true],
        ['1.1', false],
        ['1/2', false],
        ['32', true],
        ['300', true],
        ['3 1/2', false]
    ])('deve verificar se a medida é um número inteiro', (input, output) => {
        expect(new Measure(new Numeric(input)).isInt).toBe(output)
    })

    it.each([
        ['1', false],
        ['1.1', true],
        ['1/2', false],
        ['32', false],
        ['300', false],
        ['3 1/2', false],
        ['3.14', true]
    ])(
        'deve verificar se a medida é um número ponto flutuante',
        (input, output) => {
            expect(new Measure(new Numeric(input)).isFloat).toBe(output)
        }
    )

    it.each([
        ['1', false],
        ['1.1', false],
        ['1/2', true],
        ['32', false],
        ['300', false],
        ['3 1/2', false],
        ['3.14', false],
        ['3/2', true]
    ])('deve verificar se a medida é uma fração', (input, output) => {
        expect(new Measure(new Numeric(input)).isFraction).toBe(output)
    })

    it.each([
        ['1', false],
        ['1.1', false],
        ['5 1/2', true],
        ['32', false],
        ['7 3/2', true],
        ['3 1/2', true],
        ['3.14', false],
        ['3/2', false]
    ])('deve verificar se a medida é um número misto', (input, output) => {
        expect(new Measure(new Numeric(input)).isMixed).toBe(output)
    })

    it.each([
        ['1', 1],
        ['1.1', 1.1],
        ['5 1/2', 5.5],
        ['32', 32],
        ['7 3/2', 8.5],
        ['3 1/2', 3.5],
        ['3.14', 3.14],
        ['3/2', 1.5]
    ])('deve transformar se a medida em um número', (input, output) => {
        expect(new Measure(new Numeric(input)).toNumber()).toBe(output)
    })

    it('deve lançar um erro se a medida for zero', () => {
        const input = randMeasure({ testCase: 'zero' })

        expect(() => new Measure(input)).toThrowError(
            'A medida deve ser maior que zero'
        )
    })

    it('deve lançar um erro se a medida for negativa', () => {
        const input = randMeasure({ testCase: 'negative' })

        expect(() => new Measure(input)).toThrowError(
            'A medida deve ser maior que zero'
        )
    })
})
