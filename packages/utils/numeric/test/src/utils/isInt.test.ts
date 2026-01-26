import { describe, it, expect } from 'vitest'

import { isInt } from '~/utils/isInt'

describe('isInt', () => {
    it('deve verificar se um valor é uma string numérica inteira', () => {
        expect(isInt('1')).toBeTruthy()
        expect(isInt('0')).toBeTruthy()
        expect(isInt('123')).toBeTruthy()
        expect(isInt('-37')).toBeTruthy()

        expect(isInt('9.3')).toBeFalsy()
        expect(isInt('-1.2')).toBeFalsy()
        expect(isInt('3/2')).toBeFalsy()
        expect(isInt('5 1/2')).toBeFalsy()
        expect(isInt('-5 1/2')).toBeFalsy()
    })
})
