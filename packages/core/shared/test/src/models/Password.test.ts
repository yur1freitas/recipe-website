import { expect, describe, it, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randPassword } from '~mocks/randPassword'

import { Password } from '~/models/Password'

describe('Password', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar se o valor de entrada for válido', () => {
        const input = randPassword()

        const password = new Password(input)

        expect(password.value).toBe(input)
    })

    it('deve lançar um erro se a senha for vazia', () => {
        expect(() => {
            const input = ''
            new Password(input)
        }).toThrowError('A senha não pode ser vazia')
    })

    it('deve lançar um erro se a senha for muito curta', () => {
        expect(() => {
            const input = randPassword({ testCase: 'shorter' })

            new Password(input)
        }).toThrowError('A senha deve ter no mínimo 8 caracteres')
    })

    it('deve lançar um erro se a senha não tiver nenhuma letra maiúscula', () => {
        expect(() => {
            const input = randPassword({ testCase: 'missing-uppercase-letter' })

            new Password(input)
        }).toThrowError('A senha deve ter pelo menos 1 letra maiúscula')
    })

    it('deve lançar um erro se a senha não tiver nenhuma letra minúscula', () => {
        expect(() => {
            const input = randPassword({ testCase: 'missing-lowercase-letter' })

            new Password(input)
        }).toThrowError('A senha deve ter pelo menos 1 letra minúscula')
    })

    it('deve lançar um erro se a senha não tiver nenhum numero', () => {
        expect(() => {
            const input = randPassword({ testCase: 'missing-number' })

            new Password(input)
        }).toThrowError('A senha deve ter pelo menos 1 número')
    })
})
