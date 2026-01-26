import { faker } from '@faker-js/faker/locale/pt_BR'
import { describe, it, expect } from 'vitest'

import { randFraction } from '~mocks/randFraction'
import { randNumeric } from '~mocks/randNumeric'
import { randFloat } from '~mocks/randFloat'
import { randMixed } from '~mocks/randMixed'
import { randInt } from '~mocks/randInt'

import { NumericType } from '~/consts'
import { Numeric } from '~/numeric'

describe('Numeric', () => {
    it('deve instanciar uma classe Numeric', () => {
        const input = randNumeric()
        const numeric = new Numeric(input)

        expect(numeric.value).toBe(input)
    })

    it.each([
        '',
        ' ',
        'Hello World',
        ' 1',
        ' 1/ 2',
        '3,2',
        '+',
        '-',
        ' 1.',
        '.3'
    ])(
        'deve lançar um erro ao tentar instânciar com um valor que não é uma string numérica',
        (input) => {
            expect(() => new Numeric(input)).toThrowError(
                'A entrada fornecida não é um valor numérico'
            )
        }
    )

    it.each([
        ['1', 1],
        ['1/2', 0.5],
        ['3 1/2', 3.5],
        ['0.23', 0.23],
        ['-1', -1],
        ['-1/2', -0.5],
        ['-0.23', -0.23],
        ['-3 1/2', -3.5]
    ])(
        'deve transformar a string numérica em um número através do método de instância',
        (input, output) => {
            expect(new Numeric(input).toNumber()).toBeCloseTo(output, 2)
        }
    )

    it('deve converter um inteiro em número', () => {
        const input = randInt()
        const numeric = new Numeric(input)

        expect(numeric.toNumber()).toBeTypeOf('number')
    })

    it('deve ser do tipo "int" se for passado um valor numérico inteiro', () => {
        const input = randInt()
        const numeric = new Numeric(input)

        expect(numeric.value).toBe(input)
        expect(numeric.type).toBe(NumericType.INT)
    })

    it('deve ser do tipo "float" se for passado um valor numérico decimal', () => {
        const input = randFloat()
        const numeric = new Numeric(input)

        expect(numeric.value).toBe(input)
        expect(numeric.type).toBe(NumericType.FLOAT)
    })

    it('deve ser do tipo "frac" se for passado uma fração', () => {
        const input = randFraction()
        const numeric = new Numeric(input)

        expect(numeric.value).toBe(input)
        expect(numeric.type).toBe(NumericType.FRACTION)
    })

    it('deve ser do tipo "mixed" se for passado um número misto', () => {
        const input = randMixed()
        const numeric = new Numeric(input)

        expect(numeric.value).toBe(input)
        expect(numeric.type).toBe(NumericType.MIXED)
    })

    it('deve verificar se o valor é positivo', () => {
        const input = faker.number.int(100).toString()
        const numeric = new Numeric(input)

        expect(numeric.isPositive).toBeTruthy()

        expect(numeric.isNegative).toBeFalsy()
        expect(numeric.isZero).toBeFalsy()
    })

    it('deve verificar se o valor é negativo', () => {
        const input = `${-faker.number.int(100)}`
        const numeric = new Numeric(input)

        expect(numeric.isNegative).toBeTruthy()

        expect(numeric.isPositive).toBeFalsy()
        expect(numeric.isZero).toBeFalsy()
    })

    it('deve verificar se o valor é zero', () => {
        const input = '0'
        const numeric = new Numeric(input)

        expect(numeric.isZero).toBeTruthy()

        expect(numeric.isPositive).toBeFalsy()
        expect(numeric.isNegative).toBeFalsy()
    })

    it('deve verificar se o valor é um número inteiro', () => {
        const input = randInt()
        const numeric = new Numeric(input)

        expect(numeric.isInt).toBeTruthy()

        expect(numeric.isFloat).toBeFalsy()
        expect(numeric.isFraction).toBeFalsy()
        expect(numeric.isMixed).toBeFalsy()
    })

    it('deve verificar se o valor é um número fracionário', () => {
        const input = randFloat()
        const numeric = new Numeric(input)

        expect(numeric.isFloat).toBeTruthy()

        expect(numeric.isInt).toBeFalsy()
        expect(numeric.isFraction).toBeFalsy()
        expect(numeric.isMixed).toBeFalsy()
    })

    it('deve verificar se o valor é uma fração', () => {
        const input = randFraction()
        const numeric = new Numeric(input)

        expect(numeric.isFraction).toBeTruthy()

        expect(numeric.isInt).toBeFalsy()
        expect(numeric.isFloat).toBeFalsy()
        expect(numeric.isMixed).toBeFalsy()
    })

    it('deve verificar se o valor é um número misto', () => {
        const input = randMixed()
        const numeric = new Numeric(input)

        expect(numeric.isMixed).toBeTruthy()

        expect(numeric.isInt).toBeFalsy()
        expect(numeric.isFloat).toBeFalsy()
        expect(numeric.isFraction).toBeFalsy()
    })

    it('deve fazer um parser no valor', () => {
        const input = randNumeric()
        const numeric = new Numeric(input)

        const output = numeric.parse()

        expect(output.type).toBeOneOf([
            NumericType.INT,
            NumericType.FLOAT,
            NumericType.FRACTION,
            NumericType.MIXED
        ])

        expect(output.input).toBe(input)
        expect(output.value).toBeTypeOf('number')
    })

    it('deve fazer um parser no valor', () => {
        const input = randNumeric()
        const numeric = new Numeric(input)

        const output = numeric.parse()

        expect(output.type).toBeOneOf([
            NumericType.INT,
            NumericType.FLOAT,
            NumericType.FRACTION,
            NumericType.MIXED
        ])

        expect(output.input).toBe(input)
        expect(output.value).toBeTypeOf('number')
    })

    it('deve transformar a instâcia em string', () => {
        const input = randNumeric()
        const numeric = new Numeric(input)

        expect(`${numeric}`).toBe(input)
        expect(numeric + '').toBe(input)
        expect(numeric.toString()).toBe(input)
    })

    it('deve transformar a instâcia em JSON', () => {
        const input = randNumeric()
        const numeric = new Numeric(input)

        expect(numeric.toJSON()).toBe(input)
        expect(JSON.stringify(numeric)).toBe(`"${input}"`)
        expect(JSON.stringify({ numeric })).toBe(`{"numeric":"${input}"}`)
    })
})
