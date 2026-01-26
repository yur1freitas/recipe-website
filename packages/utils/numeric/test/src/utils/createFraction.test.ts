import { describe, it, expect } from 'vitest'

import { createFraction } from '~/utils/createFraction'

describe('createFraction', () => {
    it.each([
        [1, 2, '1/2'],
        [3, 2, '3/2'],
        [-7, 2, '-7/2'],
        [9, -13, '9/-13'],
        ['1', 0, '1/0'],
        [4, '2', '4/2']
    ])('deve criar uma fração', (numerator, denominator, output) => {
        expect(createFraction({ numerator, denominator })).toBe(output)
    })
})
