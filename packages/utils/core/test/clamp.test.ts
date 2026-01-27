import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { clamp } from '~/clamp'

describe('clamp', () => {
    it('deve limitar as extremidades de um valor', () => {
        const min = faker.number.int({ min: 0, max: 50 })
        const max = faker.number.int({ min: 50, max: 100 })

        {
            const value = faker.number.int({ min: -100, max: 0 })
            expect(clamp({ min, max, value })).toBe(min)
        }

        {
            const value = faker.number.int({ min, max })
            expect(clamp({ min, max, value })).toBe(value)
        }

        {
            const value = faker.number.int({ min: 100, max: 200 })
            expect(clamp({ min, max, value })).toBe(max)
        }
    })
})
