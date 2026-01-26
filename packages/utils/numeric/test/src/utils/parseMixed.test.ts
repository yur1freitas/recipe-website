import { describe, it, expect } from 'vitest'

import { parseMixed } from '~/utils/parseMixed'
import { NumericType } from '~/consts'

describe('parseMixed', () => {
    it.each([
        ['-5 1/2', -5.5],
        ['3 1/3', 3.33],
        ['1 2/10', 1.2]
    ])(
        'deve converter um número misto para número: parseMixed("%s") -> %f',
        (input, value) => {
            const type = NumericType.MIXED
            const output = parseMixed(input)

            expect(output.type).toBe(type)
            expect(output.value).toBeCloseTo(value, 2)
        }
    )

    it.each(['1', '3/2', '9/0', 'foo', '3.14', '1  2/3', '123abc', '', ' '])(
        'deve lançar um erro se não for um número misto: parseMixed("%s")',
        (input) => {
            expect(() => parseMixed(input)).toThrowError(
                'A entrada fornecida não é um número misto'
            )
        }
    )
})
