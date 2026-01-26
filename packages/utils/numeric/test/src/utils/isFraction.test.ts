import { describe, it, expect } from 'vitest'

import { isFraction } from '~/utils/isFraction'

describe('isFraction', () => {
    it('deve verificar se um valor é uma fração', () => {
        expect(isFraction('3/2')).toBeTruthy()
        expect(isFraction('-3/2')).toBeTruthy()
        expect(isFraction('1/-8')).toBeTruthy()

        expect(isFraction('9.3')).toBeFalsy()
        expect(isFraction('-1.2')).toBeFalsy()
        expect(isFraction('1')).toBeFalsy()
        expect(isFraction('0')).toBeFalsy()
        expect(isFraction('123')).toBeFalsy()
        expect(isFraction('-37')).toBeFalsy()
        expect(isFraction('5 1/2')).toBeFalsy()
        expect(isFraction('-5 1/2')).toBeFalsy()
    })
})
