import { describe, it, expect } from 'vitest'

import { parseNumeric } from '~/utils/parseNumeric'
import { NumericError } from '~/error'
import { NumericType } from '~/consts'

describe('parseNumeric', () => {
    it.each([
        ['1', [NumericType.INT, 1]],
        ['3 1/3', [NumericType.MIXED, 3.33]],
        ['1 2/10', [NumericType.MIXED, 1.2]],
        ['3/2', [NumericType.FRACTION, 1.5]],
        ['3.14', [NumericType.FLOAT, 3.14]]
    ] as const)(
        'deve converter um número misto para número: parseNumeric("%s") -> %f',
        (input, [type, value]) => {
            const output = parseNumeric(input)

            expect(output.type).toBe(type)
            expect(output.value).toBeCloseTo(value, 2)
        }
    )

    it.each([
        '  1  ',
        '3 /2',
        ' 9/0 ',
        'foo',
        '3. 14',
        '1  2/3',
        ' 123abc ',
        '',
        ' ',
        'Hello World!'
    ])(
        'deve lançar um erro se não for uma string numérica: parseNumeric("%s")',
        (input) => {
            expect(() => parseNumeric(input)).toThrowError(NumericError)
        }
    )
})
