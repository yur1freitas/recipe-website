import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { arrayInsert } from '~/arrayInsert'

describe('arrayInsert', () => {
    it('deve inserir um item no array em um índice específico', () => {
        const array = [1, 2, 3]

        const index = faker.number.int({ min: 0, max: array.length - 1 })
        const value = faker.number.int({ min: 4, max: 10 })

        const newArray = arrayInsert(array, index, value)

        expect(array[index]).not.toBe(value)
        expect(newArray[index]).toBe(value)
    })

    it('deve retornar uma cópia do array ao inserir um item', () => {
        const array = [1, 2, 3]

        const index = faker.number.int({ min: 0, max: array.length - 1 })
        const value = faker.number.int({ min: 4, max: 10 })

        const newArray = arrayInsert(array, index, value)

        expect(newArray).not.toBe(array)
    })
})
