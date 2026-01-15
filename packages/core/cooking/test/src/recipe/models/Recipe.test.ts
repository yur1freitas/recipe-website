import { expect, it, describe, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randPreparationTime } from '~mocks/randPreparationTime'
import { randDescription } from '~mocks/randDescription'
import { randIngredient } from '~mocks/randIngredient'
import { randDifficulty } from '~mocks/randDifficulty'
import { randRecipe } from '~mocks/randRecipe'
import { randAmount } from '~mocks/randAmount'
import { randOrder } from '~mocks/randOrder'
import { randTool } from '~mocks/randTool'
import { randStep } from '~mocks/randStep'
import { randName } from '~mocks/randName'

import { ValidatorError } from '@core/shared'

import { Recipe } from '~/recipe/models/Recipe'

describe('Recipe', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar uma receita', () => {
        const input = randRecipe()
        const recipe = new Recipe(input)

        expect(recipe.props).toStrictEqual(input)
    })

    it('deve lançar um erro se o nome for inválido', () => {
        const input = randRecipe({
            name: randName({ testCase: 'invalid-chars' })
        })

        expect(() => new Recipe(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se a descrição for inválida', () => {
        const input = randRecipe({
            description: randDescription({ testCase: 'invalid-char' })
        })

        expect(() => new Recipe(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se a dificuldade for inválida', () => {
        const input = randRecipe({
            difficulty: randDifficulty({ testCase: 'invalid' })
        })

        expect(() => new Recipe(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se o tempo de preparo for inválido', () => {
        const input = randRecipe({
            preparationTime: randPreparationTime({ testCase: 'negative' })
        })

        expect(() => new Recipe(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se uma das etapas forem inválidas', () => {
        const input = randRecipe({
            steps: [
                randStep(),
                randStep({
                    order: randOrder({ testCase: 'negative' })
                })
            ]
        })

        expect(() => new Recipe(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se um dos utensílios forem inválidos', () => {
        const input = randRecipe({
            tools: [
                randTool(),
                randTool({
                    amount: randAmount({ testCase: 'negative' })
                })
            ]
        })

        expect(() => new Recipe(input)).toThrowError(ValidatorError)
    })

    it('deve lançar um erro se um dos ingredientes forem inválidos', () => {
        const input = randRecipe({
            ingredients: [
                randIngredient(),
                randIngredient({
                    name: randName({ testCase: 'short' })
                })
            ]
        })

        expect(() => new Recipe(input)).toThrowError(ValidatorError)
    })
})
