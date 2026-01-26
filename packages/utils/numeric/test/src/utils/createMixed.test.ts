import { describe, it, expect } from 'vitest'

import { createMixed } from '~/utils/createMixed'

describe('createMixed', () => {
    it.each([
        [1, 1, 2, '1 1/2'],
        [2, 3, 2, '2 3/2'],
        [3, -7, 2, '3 -7/2'],
        [6, 9, -13, '6 9/-13'],
        [4, '1', 0, '4 1/0'],
        ['0', 4, '2', '0 4/2']
    ])(
        'deve criar um número misto',
        (whole, numerator, denominator, output) => {
            expect(createMixed({ whole, numerator, denominator })).toBe(output)
        }
    )
})
