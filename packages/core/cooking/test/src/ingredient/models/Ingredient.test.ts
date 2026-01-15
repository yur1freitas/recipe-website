import { expect, it, describe, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randIngredient } from '~mocks/randIngredient'
import { randMeasure } from '~mocks/randMeasure'
import { randUnit } from '~mocks/randUnit'

import { ValidatorError } from '@core/shared'

import { Ingredient } from '~/ingredient/models/Ingredient'
import { UNIT_NAMES } from '~/index'

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
            measure: randMeasure({ testCase: 'empty' })
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
