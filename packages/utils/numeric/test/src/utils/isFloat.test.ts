import { describe, it, expect } from 'vitest'

import { isFloat } from '~/utils/isFloat'

describe('isFloat', () => {
    it('deve verificar se um valor é uma fração', () => {
        expect(isFloat('9.3')).toBeTruthy()
        expect(isFloat('-1.2')).toBeTruthy()
        expect(isFloat('1.3')).toBeTruthy()
        expect(isFloat('0.0')).toBeTruthy()
        expect(isFloat('12.3')).toBeTruthy()
        expect(isFloat('-37.2')).toBeTruthy()

        expect(isFloat('1')).toBeFalsy()
        expect(isFloat('3/2')).toBeFalsy()
        expect(isFloat('5 1/2')).toBeFalsy()
        expect(isFloat('-5 1/2')).toBeFalsy()
    })
})
