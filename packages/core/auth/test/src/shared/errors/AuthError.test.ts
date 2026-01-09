import { describe, afterEach, expect, it } from 'vitest'

import { fakerPT_BR as faker } from '@faker-js/faker'

import { CustomError } from '@core/shared'

import { AuthError } from '~/shared/errors/AuthError'

const randCode = () => faker.word.words(3).replace(/\s+/g, '_').toUpperCase()

const randMessage = () => faker.hacker.phrase()

describe('AuthError', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar um erro de autenticação', () => {
        const code = randCode()
        const message = randMessage()

        const error = new AuthError({
            code,
            message
        })

        expect(error).toBeInstanceOf(Error)
        expect(error.code).toBe(code)
        expect(error.message).toBe(message)
        expect(error.props).toStrictEqual({ code, message })
    })

    it('deve verificar se o valor é um erro de autenticação', () => {
        const age = faker.number.int(10)

        const code = randCode()
        const message = randMessage()

        const customError = new CustomError({
            code,
            message
        })

        const authError = new AuthError({
            code,
            message
        })

        expect(AuthError.isError(age)).toBeFalsy()
        expect(AuthError.isError(customError)).toBeFalsy()
        expect(AuthError.isError(authError)).toBeTruthy()
    })
})
