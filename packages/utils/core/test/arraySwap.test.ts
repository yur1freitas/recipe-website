import { faker } from '@faker-js/faker/locale/pt_BR'
import { describe, it, expect } from 'vitest'

import { arraySwap } from '~/arraySwap'

describe('arraySwap', () => {
    it('deve trocar dois items do array de lugar', () => {
        const array = [1, 2, 3]
        const [a, b] = faker.helpers.uniqueArray(
            () => faker.number.int({ min: 0, max: array.length - 1 }),
            2
        )

        const newArray = arraySwap(array, a, b)

        expect(newArray[a]).toBe(array[b])
        expect(newArray[b]).toBe(array[a])
    })

    it('deve retornar uma cópia do array ao trocar os items', () => {
        const array = [1, 2, 3]
        const [a, b] = faker.helpers.uniqueArray(
            () => faker.number.int({ min: 0, max: array.length - 1 }),
            2
        )

        const newArray = arraySwap(array, a, b)

        expect(newArray).not.toBe(array)
    })
})
