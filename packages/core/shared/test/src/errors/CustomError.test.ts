import { describe, afterEach, expect, it } from 'vitest'

import { fakerPT_BR as faker } from '@faker-js/faker'

import { CustomError } from '~/errors/CustomError'

const randCode = () => faker.word.words(3).replace(/\s+/g, '_').toUpperCase()

const randMessage = () => faker.hacker.phrase()

describe('CustomError', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar um erro customizado', () => {
        const code = randCode()
        const message = randMessage()

        const error = new CustomError({
            code,
            message
        })

        expect(error).toBeInstanceOf(Error)
        expect(error.code).toBe(code)
        expect(error.message).toBe(message)
        expect(error.props).toStrictEqual({ code, message })
    })

    it('deve verificar se o valor é um erro customizado', () => {
        const age = faker.number.int(10)

        const name = faker.person.firstName()

        const error = new CustomError({
            code: randCode(),
            message: randMessage()
        })

        expect(CustomError.isError(age)).toBeFalsy()
        expect(CustomError.isError(name)).toBeFalsy()
        expect(CustomError.isError(error)).toBeTruthy()
    })
})
