import { describe, it, expect } from 'vitest'

import { parseFraction } from '~/utils/parseFraction'
import { NumericType } from '~/consts'

describe('parseFraction', () => {
    it.each([
        ['3/2', 1.5, [3, 2]],
        ['-5/2', -2.5, [-5, 2]],
        ['11/-2', -5.5, [11, -2]],
        ['0/9', 0, [0, 9]]
    ])(
        'deve converter uma fração para número: parseFraction("%s") -> %f',
        (input, value, [numerator, denominator]) => {
            const type = NumericType.FRACTION

            expect(parseFraction(input)).toStrictEqual({
                type,
                input,
                numerator,
                denominator,
                value
            })
        }
    )

    it.each(['1', '3.2', '3 1/2', '1 / 1', '1/0'])(
        'deve lançar um erro se não for uma fração: parseFraction("%s")',
        (input) => {
            expect(() => parseFraction(input)).toThrowError(
                'A entrada fornecida não é uma fração'
            )
        }
    )
})
