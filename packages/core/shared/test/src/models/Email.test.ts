import { expect, describe, it, afterEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { randEmail } from '~mocks/randEmail'
import { Email } from '~/models/Email'

describe('Email', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar se o valor de entrada for válido', () => {
        const input = randEmail()
        const email = new Email(input)

        expect(email.value).toBe(input)
    })

    it('deve lançar um erro se o valor de entrada for inválido', () => {
        expect(() => {
            const input = randEmail({ testCase: 'missing-username' })
            new Email(input)
        }).toThrow('O email fornecido não é válido')

        expect(() => {
            const input = randEmail({ testCase: 'missing-domain' })
            new Email(input)
        }).toThrow('O email fornecido não é válido')

        expect(() => {
            const input = randEmail({ testCase: 'missing-at-symbol' })
            new Email(input)
        }).toThrow('O email fornecido não é válido')

        expect(() => {
            const input = faker.hacker.phrase()
            new Email(input)
        }).toThrow('O email fornecido não é válido')

        expect(() => {
            const input = faker.internet.domainName()
            new Email(input)
        }).toThrow('O email fornecido não é válido')

        expect(() => {
            const input = faker.string.fromCharacters(' ', { min: 0, max: 10 })
            new Email(input)
        }).toThrow('O email fornecido não é válido')
    })

    it('deve comparar se outro valor é igual a ele', () => {
        const targetEmail = new Email(randEmail())
        const sameEmail = new Email(targetEmail.value)

        const otherEmail = new Email(randEmail())

        expect(targetEmail.equals(otherEmail)).toBeFalsy()

        expect(targetEmail.equals(sameEmail)).toBeTruthy()
        expect(targetEmail.equals(targetEmail)).toBeTruthy()
    })
})
