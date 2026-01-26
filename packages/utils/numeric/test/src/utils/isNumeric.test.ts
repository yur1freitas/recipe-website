import { describe, it, expect } from 'vitest'

import { isNumeric } from '~/utils/isNumeric'

describe('isNumeric', () => {
    it('deve verificar se um valor é uma string numérica', () => {
        expect(isNumeric('9')).toBeTruthy()
        expect(isNumeric('-1.2')).toBeTruthy()
        expect(isNumeric('3 1/2')).toBeTruthy()
        expect(isNumeric('0.0')).toBeTruthy()
        expect(isNumeric('12.3')).toBeTruthy()
        expect(isNumeric('-37.2')).toBeTruthy()
        expect(isNumeric('1')).toBeTruthy()
        expect(isNumeric('3/2')).toBeTruthy()
        expect(isNumeric('5 1/2')).toBeTruthy()
        expect(isNumeric('-5 1/2')).toBeTruthy()

        expect(isNumeric('Hello World')).toBeFalsy()
        expect(isNumeric(' 1 ')).toBeFalsy()
        expect(isNumeric('3 / 2')).toBeFalsy()
        expect(isNumeric('1,2')).toBeFalsy()
        expect(isNumeric(' ')).toBeFalsy()
        expect(isNumeric('')).toBeFalsy()
    })
})
