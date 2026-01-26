import { describe, it, expect } from 'vitest'

import { parseFloating } from '~/utils/parseFloating'
import { NumericType } from '~/consts'

describe('parseFloating', () => {
    it.each([
        ['1.1', 1.1],
        ['-3.14', -3.14],
        ['0.0', 0],
        ['32.01', 32.01]
    ])(
        'deve converter uma string numérica ponto flutuante para número: parseFloating("%s") -> %f',
        (input, value) => {
            const type = NumericType.FLOAT

            expect(parseFloating(input)).toStrictEqual({ type, input, value })
        }
    )

    it.each(['Hello World!', '1', '3/2', '3 1/2', ' ', ''])(
        'deve lançar um erro se não for uma string numérica ponto flutuante: parseFloating("%s")',
        (input) => {
            expect(() => parseFloating(input)).toThrowError(
                'A entrada fornecida não é um número ponto flutuante'
            )
        }
    )
})
