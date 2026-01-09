import { expect, describe, it, afterEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { randUsername } from '~mocks/randUsername'

import { Username } from '~/models/Username'

describe('Username', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar se o valor de entrada for válido', () => {
        const input = randUsername()
        const username = new Username(input)

        expect(username.value).toBe(input)
    })

    it('deve lançar um erro se o nome for vazio', () => {
        expect(() => {
            const input = ''
            new Username(input)
        }).toThrow('O nome não pode ser vazio')
    })

    it('deve lançar um erro se o nome for menor que 3 caracteres', () => {
        expect(() => {
            const input = randUsername({ testCase: 'shorter' })
            new Username(input)
        }).toThrow('O nome deve ter no mínimo 3 caracteres')
    })

    it('deve lançar um erro se o nome for maior que 120 caracteres', () => {
        expect(() => {
            const input = randUsername({ testCase: 'larger' })

            new Username(input)
        }).toThrow('O nome deve ter no máximo 120 caracteres')
    })

    it('deve lançar um erro se o nome conter caracteres inválidos', () => {
        expect(() => {
            const input = randUsername({ testCase: 'invalid-chars' })

            new Username(input)
        }).toThrow('O nome deve conter somente caracteres válidos')
    })

    it('deve comparar se outro valor é igual a ele', () => {
        const targerName = new Username(randUsername())
        const sameName = new Username(targerName.value)

        const otherName = new Username(randUsername())

        expect(targerName.equals(otherName)).toBeFalsy()

        expect(targerName.equals(sameName)).toBeTruthy()
        expect(targerName.equals(targerName)).toBeTruthy()
    })
})
