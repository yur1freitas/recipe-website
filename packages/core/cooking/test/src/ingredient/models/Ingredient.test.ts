import { expect, it, describe, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randIngredient } from '~mocks/randIngredient'
import { randMeasure } from '~mocks/randMeasure'
import { randUnit } from '~mocks/randUnit'

import { ValidatorError } from '@core/shared'

import { UNIT_NAMES } from '~/ingredient/constants/unitNames'
import { Ingredient } from '~/ingredient/models/Ingredient'

describe('Ingredient', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar um ingrediente', () => {
        const input = randIngredient()
        const ingredient = new Ingredient(input)

        expect(ingredient.props).toStrictEqual(input)
    })

    it('deve lançar um erro se a unidade for inválida', () => {
        const input = randIngredient({
            unit: randUnit({ testCase: 'invalid' })
        })

        expect(() => new Ingredient(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se a medida for inválida', () => {
        const input = randIngredient({
            measure: randMeasure({ testCase: 'negative' })
        })

        expect(() => new Ingredient(input)).toThrowError(ValidatorError)
    })

    it('deve formatar as informações do ingrediente', () => {
        const input = randIngredient()
        const ingredient = new Ingredient(input)

        expect(ingredient.format()).toBe(
            `${input.measure} ${UNIT_NAMES[input.unit].singular} de ${input.name}`
        )
    })
})
