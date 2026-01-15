import { expect, it, describe, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randDescription } from '~mocks/randDescription'

import { Description } from '~/shared/models/Description'

describe('Description', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma descrição', () => {
        const input = randDescription()
        const description = new Description(input)

        expect(description.value).toBe(input)
    })

    it('deve lançar um erro se a descrição for vazia', () => {
        const input = randDescription({ testCase: 'empty' })

        expect(() => new Description(input)).toThrowError(
            'A descrição não pode ser vazia'
        )
    })

    it('deve lançar um erro se a descrição tiver mais de 256 caracteres', () => {
        const input = randDescription({ testCase: 'larger' })

        expect(() => new Description(input)).toThrowError(
            'A descrição deve ter no máximo 256 caracteres'
        )
    })

    it('deve lançar um erro se a descrição tiver caracteres ínválidos', () => {
        const input = randDescription({ testCase: 'invalid-char' })

        expect(() => new Description(input)).toThrowError(
            'A descrição deve conter apenas caracteres permitidos'
        )
    })
})
