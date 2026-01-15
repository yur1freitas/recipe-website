import { describe, afterEach, expect, it } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { CustomError } from '@core/shared'

import { CookingError } from '~/shared/errors/CookingError'

const randCode = () => faker.word.words(3).replace(/\s+/g, '_').toUpperCase()

const randMessage = () => faker.hacker.phrase()

describe('CookingError', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar um erro de autenticação', () => {
        const code = randCode()
        const message = randMessage()

        const error = new CookingError({
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

        const cookingError = new CookingError({
            code,
            message
        })

        expect(CookingError.isError(age)).toBeFalsy()
        expect(CookingError.isError(customError)).toBeFalsy()
        expect(CookingError.isError(cookingError)).toBeTruthy()
    })
})
