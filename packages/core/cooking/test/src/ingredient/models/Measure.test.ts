import { expect, it, describe, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randMeasure } from '~mocks/randMeasure'

import { Measure } from '~/ingredient/models/Measure'

describe('Measure', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma medida', () => {
        const input = randMeasure()
        const measure = new Measure(input)

        expect(measure.value).toBe(input)
    })

    it('deve lançar um erro se a medida for vazio', () => {
        const input = randMeasure({ testCase: 'empty' })

        expect(() => new Measure(input)).toThrowError(
            'A medida não pode ser vazia'
        )
    })
})
