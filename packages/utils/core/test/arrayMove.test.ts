import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { arrayMove } from '~/arrayMove'

describe('arrayMove', () => {
    it('deve mover um item do array para um índice específico', () => {
        const array = [1, 2, 3]
        const [a, b] = faker.helpers.uniqueArray(
            () => faker.number.int({ min: 0, max: array.length - 1 }),
            2
        )

        const newArray = arrayMove(array, a, b)

        expect(newArray[a]).not.toBe(array[a])
        expect(newArray[b]).toBe(array[a])
    })

    it('deve retornar uma cópia do array ao mover os items', () => {
        const array = [1, 2, 3]
        const [a, b] = faker.helpers.uniqueArray(
            () => faker.number.int({ min: 0, max: array.length - 1 }),
            2
        )

        const newArray = arrayMove(array, a, b)

        expect(newArray).not.toBe(array)
    })
})
