import { expect, it, describe, afterEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { Name } from '~/shared/models/Name'

import { randName } from '~mocks/randName'

describe('Name', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar um nome', () => {
        const input = randName()
        const name = new Name(input)

        expect(name.value).toBe(input)
    })

    it('deve lançar um erro se o nome for vazio', () => {
        const input = randName({ testCase: 'empty' })

        expect(() => new Name(input)).toThrowError('O nome não pode ser vazio')
    })

    it('deve lançar um erro se o nome tiver menos de 3 caracteres', () => {
        const input = randName({ testCase: 'short' })

        expect(() => new Name(input)).toThrowError(
            'O nome deve ter no mínimo 3 caracteres'
        )
    })

    it('deve lançar um erro se o nome tiver mais de 64 caracteres', () => {
        const input = randName({ testCase: 'larger' })

        expect(() => new Name(input)).toThrowError(
            'O nome deve ter no máximo 64 caracteres'
        )
    })

    it('deve lançar um erro se o nome tiver caracteres inválidos', () => {
        const input = randName({ testCase: 'invalid-chars' })

        expect(() => new Name(input)).toThrowError('O nome deve ser válido')
    })
})
