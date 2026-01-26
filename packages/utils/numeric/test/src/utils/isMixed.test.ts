import { describe, it, expect } from 'vitest'

import { isMixed } from '~/utils/isMixed'

describe('isMixed', () => {
    it('deve verificar se um valor é um número misto', () => {
        expect(isMixed('5 1/2')).toBeTruthy()
        expect(isMixed('-5 1/2')).toBeTruthy()

        expect(isMixed('3/2')).toBeFalsy()
        expect(isMixed('-3/2')).toBeFalsy()
        expect(isMixed('1/-8')).toBeFalsy()
        expect(isMixed('9.3')).toBeFalsy()
        expect(isMixed('-1.2')).toBeFalsy()
        expect(isMixed('1')).toBeFalsy()
        expect(isMixed('0')).toBeFalsy()
        expect(isMixed('123')).toBeFalsy()
        expect(isMixed('-37')).toBeFalsy()
    })
})
