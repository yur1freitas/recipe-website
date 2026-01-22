import { describe, it, expect } from 'vitest'

import { isPlainObject } from '~/isPlainObject'

describe('isPlainObject', () => {
    it('deve retornar true se o valor é um objeto', () => {
        expect(isPlainObject({})).toBeTruthy()
        expect(isPlainObject(Object.create(null))).toBeTruthy()
    })

    it('deve retornar false se o valor não é um objeto', () => {
        expect(isPlainObject('')).toBeFalsy()
        expect(isPlainObject(NaN)).toBeFalsy()
        expect(isPlainObject([])).toBeFalsy()
        expect(isPlainObject(0)).toBeFalsy()
        expect(isPlainObject(new Map())).toBeFalsy()
    })
})
