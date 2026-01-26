import { describe, it, expect } from 'vitest'

import { parseInteger } from '~/utils/parseInteger'
import { NumericType } from '~/consts'

describe('parseInteger', () => {
    it.each([
        ['1', 1],
        ['-3', -3],
        ['0', 0],
        ['100', 100]
    ])(
        'deve converter uma string numérica inteira para número: parseInteger("%s") -> %i',
        (input, value) => {
            const type = NumericType.INT

            expect(parseInteger(input)).toStrictEqual({ type, input, value })
        }
    )

    it.each(['Hello World!', '1.1', '3/2', '3 1/2', ' ', ''])(
        'deve lançar um erro se não for uma string numérica inteira: parseInteger("%s")',
        (input) => {
            expect(() => parseInteger(input)).toThrowError(
                'A entrada fornecida não é um número inteiro'
            )
        }
    )
})
