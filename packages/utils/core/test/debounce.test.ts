import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { debounce } from '~/debounce'

describe('debounce', () => {
    beforeAll(() => {
        vi.useFakeTimers()
    })

    afterAll(() => {
        vi.restoreAllMocks()
    })

    it('deve chamar a callback um única vez se for executado várias vezes antes do delay acabar', () => {
        const callsAmount = faker.number.int({ min: 1, max: 10 })

        const delay = faker.number.int({ min: 1_000, max: 5_000 })
        const callback = vi.fn()

        const fn = debounce({ delay, callback })

        expect(fn).toBeTypeOf('function')

        for (let i = 0; i < callsAmount; i++) {
            fn()
        }

        vi.runAllTimers()

        expect(callback).toHaveBeenCalledOnce()
    })
})
