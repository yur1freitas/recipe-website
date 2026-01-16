import { expect, describe, it, afterEach, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { RecipeRepositoryProviderMock } from '~mocks/providers/RecipeRepositoryProviderMock'
import { randRecipe } from '~mocks/randRecipe'

import { randId } from '@core/shared/mocks'

import type { RecipeProps } from '~/recipe/models/Recipe'

import { FindRecipe } from '~/recipe/usecases/FindRecipe'
import { Recipe } from '~/recipe/models/Recipe'

describe('FindRecipe', () => {
    let recipe: RecipeProps
    let recipeRepositoryProvider: RecipeRepositoryProviderMock

    afterEach(() => {
        faker.seed()
    })

    beforeEach(() => {
        recipe = randRecipe()
        recipeRepositoryProvider = new RecipeRepositoryProviderMock([
            [recipe.id, recipe]
        ])
    })

    it('deve buscar uma receita', async () => {
        const findRecipe = new FindRecipe(recipeRepositoryProvider)

        await expect(
            findRecipe.execute({ id: recipe.id })
        ).resolves.toStrictEqual(new Recipe(recipe))
    })

    it('deve retornar nulo se a receita não for encontrada', async () => {
        const findRecipe = new FindRecipe(recipeRepositoryProvider)

        const id = randId()

        await expect(findRecipe.execute({ id })).resolves.toBeNull()
    })
})
