import { describe, it, expect, vi } from 'vitest'

import { isPromise } from '~/isPromise'

describe('isPromise', () => {
    it('deve retornar true se o valor é uma promise', () => {
        expect(isPromise(new Promise(vi.fn()))).toBeTruthy()
    })

    it('deve retornar false se o valor não é uma promise', () => {
        expect(isPromise('')).toBeFalsy()
        expect(isPromise(NaN)).toBeFalsy()
        expect(isPromise({})).toBeFalsy()
        expect(isPromise([])).toBeFalsy()
        expect(isPromise(0)).toBeFalsy()
        expect(isPromise(new Map())).toBeFalsy()
    })
})
