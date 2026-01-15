import { describe, afterEach, expect, it } from 'vitest'
import { fakerPT_BR as faker } from '@faker-js/faker'

import { ValidatorError } from '~/errors/ValidatorError'
import { CustomError } from '~/errors/CustomError'

const randCode = () => faker.word.words(3).replace(/\s+/g, '_').toUpperCase()

const randMessage = () => faker.hacker.phrase()

describe('ValidatorError', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar um erro de validação', () => {
        const code = randCode()
        const message = randMessage()

        const error = new ValidatorError({
            code,
            message
        })

        expect(error).toBeInstanceOf(Error)
        expect(error.code).toBe(code)
        expect(error.message).toBe(message)
        expect(error.props).toStrictEqual({ code, message })
    })

    it('deve verificar se o valor é um erro de validação', () => {
        const age = faker.number.int(10)

        const code = randCode()
        const message = randMessage()

        const customError = new CustomError({
            code,
            message
        })

        const valiadtorError = new ValidatorError({
            code,
            message
        })

        expect(ValidatorError.isError(age)).toBeFalsy()
        expect(ValidatorError.isError(customError)).toBeFalsy()
        expect(ValidatorError.isError(valiadtorError)).toBeTruthy()
    })
})
