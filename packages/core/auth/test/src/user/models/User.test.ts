import { describe, it, expect, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randUser } from '~mocks/randUser'

import {
    randEmail,
    randEncryptedPassword,
    randUsername
} from '@core/shared/mocks'
import { ValidatorError } from '@core/shared'

import { User } from '~/user/models/User'

describe('User', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar um usuário', () => {
        const input = randUser({ password: randEncryptedPassword() })
        const user = new User(input)

        expect(user.props).toStrictEqual(input)
    })

    it('deve retornar as propriedades sem a senha', () => {
        const input = randUser({ password: randEncryptedPassword() })
        const user = new User(input)

        expect(user.password).toBeDefined()
        expect(user.propsWithoutPassword).not.haveOwnProperty('password')
        expect(user.propsWithoutPassword).toStrictEqual({
            id: input.id,
            name: input.name,
            email: input.email
        })
    })

    it('deve clonar um usuário', () => {
        const input = randUser({ password: randEncryptedPassword() })

        const user = new User(input)
        const clonedUser = user.clone({ name: randUsername() })

        expect(user).not.toBe(clonedUser)
        expect(user.id.value).toBe(clonedUser.id.value)
        expect(user.name.value).not.toBe(clonedUser.name.value)
    })

    it('deve lançar um erro se o nome for inválido', () => {
        const input = randUser({
            name: randUsername({ testCase: 'shorter' }),
            password: randEncryptedPassword()
        })

        expect(() => new User(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se o email for inválido', () => {
        const input = randUser({
            email: randEmail({ testCase: 'missing-domain' }),
            password: randEncryptedPassword()
        })

        expect(() => new User(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se a senha criptografada for inválida', () => {
        const input = randUser({ password: ' ' })

        expect(() => new User(input)).toThrowError(ValidatorError)
    })
})
