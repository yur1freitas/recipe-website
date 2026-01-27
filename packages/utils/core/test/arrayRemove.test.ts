import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { arrayRemove } from '~/arrayRemove'

describe('arrayRemove', () => {
    it('deve remover um item no array em um índice específico', () => {
        const array = [1, 2, 3]

        const index = faker.number.int({ min: 0, max: array.length - 1 })
        const value = array[index]

        const newArray = arrayRemove(array, index)

        expect(array[index]).toBe(value)
        expect(newArray[index]).not.toBe(value)
    })

    it('deve retornar uma cópia do array ao remover um item', () => {
        const array = [1, 2, 3]

        const index = faker.number.int({ min: 0, max: array.length - 1 })

        const newArray = arrayRemove(array, index)

        expect(newArray).not.toBe(array)
    })
})
