import { describe, it, expect } from 'vitest'

import { hasProperty } from '~/hasProperty'

describe('hasProperty', () => {
    it('deve retornar true se o objeto tiver a propriedade', () => {
        const object = { a: 1, b: [], c: {} }

        expect(hasProperty(object, 'a')).toBeTruthy()
        expect(hasProperty(object, 'b')).toBeTruthy()
        expect(hasProperty(object, 'c')).toBeTruthy()
    })

    it('deve retornar false se o objeto não tiver a propriedade', () => {
        const object = { a: 1, b: [], c: {} }

        expect(hasProperty(object, 'd')).toBeFalsy()
        expect(hasProperty(object, 'e')).toBeFalsy()
        expect(hasProperty(object, 'f')).toBeFalsy()
    })
})
