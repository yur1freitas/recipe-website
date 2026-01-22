import { describe, it, expect } from 'vitest'

import { pickProps } from '~/pickProps'

describe('pickProps', () => {
    it('deve retornar um objeto com as propriedades especificadas', () => {
        const object = { a: 1, b: [], c: {} }

        expect(pickProps(object, ['a', 'b'])).toStrictEqual({
            a: object.a,
            b: object.b
        })
    })

    it('não deve retornar o objeto com a propriedade se ela for undefined', () => {
        const object = { a: 1, b: [], c: undefined }

        expect(pickProps(object, ['a', 'c'])).toStrictEqual({
            a: object.a
        })
    })

    it('deve retornar um objeto vazio se as propriedades especificadas não existirem', () => {
        const object = { a: 1, b: [], c: undefined }

        const keys = ['d', 'e', 'f'] as unknown as (keyof typeof object)[]

        expect(pickProps(object, keys)).toStrictEqual({})
    })
})
