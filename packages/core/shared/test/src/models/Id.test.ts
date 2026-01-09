import { expect, describe, it, afterEach } from 'vitest'

import { v7 as uuid } from 'uuid'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randId } from '~mocks/randId'

import { Id } from '~/models/Id'

describe('Id', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar se o valor de entrada for válido', () => {
        const input = randId()
        const id = new Id(input)

        expect(id.value).toBe(input)
    })

    it('deve instanciar com um valor padrão se não houver valor de entrada', () => {
        const id = new Id()

        expect(id.value).toBeTypeOf('string')
        expect(id.isCreated).toBeTruthy()
    })

    it('deve lançar um erro se o valor de entrada for inválido', () => {
        expect(() => {
            const id = randId()
            const input = id.slice(0, id.length - 1)

            new Id(input)
        }).toThrow('O id deve ser válido')

        expect(() => {
            const input = uuid().slice(0, -1)
            new Id(input)
        }).toThrow('O id deve ser válido')

        expect(() => {
            const input = faker.internet.jwt()
            new Id(input)
        }).toThrow('O id deve ser válido')

        expect(() => {
            const input = faker.internet.email()
            new Id(input)
        }).toThrow('O id deve ser válido')

        expect(() => {
            const input = faker.string.alphanumeric()
            new Id(input)
        }).toThrow('O id deve ser válido')
    })

    it('deve retornar o carimbo de data e hora que o id foi criado', () => {
        const before = Date.now()
        const id = new Id()
        const after = Date.now()

        const timestamp = id.timestamp()

        expect(timestamp).toBeInstanceOf(Date)

        const ms = timestamp.getTime()

        expect(ms).toBeGreaterThanOrEqual(before)
        expect(ms).toBeLessThanOrEqual(after)
    })

    it('deve comparar se outro valor é igual a ele', () => {
        const targetId = new Id()
        const sameId = new Id(targetId.value)

        const otherId = new Id()

        expect(targetId.equals(otherId)).toBeFalsy()

        expect(targetId.equals(sameId)).toBeTruthy()
        expect(targetId.equals(targetId)).toBeTruthy()
    })
})
