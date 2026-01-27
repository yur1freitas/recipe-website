import { expect, it, describe, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randUnit } from '~mocks/randUnit'

import { Unit } from '~/ingredient/models/Unit'
import { UNIT_NAMES } from '~/ingredient/constants/unitNames'

describe('Unit', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma unidade', () => {
        const input = randUnit()
        const unit = new Unit(input)

        expect(unit.value).toBe(input)
    })

    it('deve lançar um erro se a unidade for inválida', () => {
        const input = randUnit({ testCase: 'invalid' })

        expect(() => new Unit(input)).toThrowError(
            'A unidade de medida precisa ser válida'
        )
    })

    it('deve formatar a unidade no singular', () => {
        const input = randUnit()
        const unit = new Unit(input)

        expect(unit.format()).toBe(UNIT_NAMES[input].singular)
    })

    it('deve formatar a unidade no plural', () => {
        const input = randUnit()
        const unit = new Unit(input)

        expect(unit.format(true)).toBe(UNIT_NAMES[input].plural)
    })
})
