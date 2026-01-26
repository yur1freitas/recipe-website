import { describe, it, expect } from 'vitest'

import { getType } from '~/utils/getType'
import { NumericType } from '~/consts'

describe('getType', () => {
    it('deve retornar o tipo do valor numérico', () => {
        expect(getType('1')).toBe(NumericType.INT)
        expect(getType('0')).toBe(NumericType.INT)
        expect(getType('123')).toBe(NumericType.INT)
        expect(getType('-37')).toBe(NumericType.INT)

        expect(getType('9.3')).toBe(NumericType.FLOAT)
        expect(getType('-1.2')).toBe(NumericType.FLOAT)

        expect(getType('3/2')).toBe(NumericType.FRACTION)

        expect(getType('5 1/2')).toBe(NumericType.MIXED)
        expect(getType('-5 1/2')).toBe(NumericType.MIXED)
    })
})
