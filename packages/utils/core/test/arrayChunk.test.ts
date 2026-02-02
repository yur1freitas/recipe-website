import { describe, it, expect } from 'vitest'

import { arrayChunk } from '~/arrayChunk'

describe('arrayChunk', () => {
    it('deve divir um array em N chunks', () => {
        const array = [1, 2, 3, 4, 5, 6]
        const chunks = arrayChunk(array, 2)

        expect(chunks).toStrictEqual([
            [1, 2],
            [3, 4],
            [5, 6]
        ])
    })

    it('deve retornar um único chunk se o tamanho for um número menor que 1', () => {
        const array = [1, 2, 3, 4, 5, 6]
        const chunks = arrayChunk(array, 0)

        expect(chunks).toStrictEqual([array])
    })

    it('deve retornar um único chunk se o tamanho não for um número inteiro', () => {
        const array = [1, 2, 3, 4, 5, 6]
        const chunks = arrayChunk(array, 1.2)

        expect(chunks).toStrictEqual([array])
    })
})
