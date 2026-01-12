import { expect, describe, it, afterEach, beforeEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { randRecipe } from '~mocks/randRecipe'
import { RecipeRepositoryProviderMock } from '~mocks/providers/RecipeRepositoryProviderMock'

import { FindAllRecipes } from '~/recipe/usecases/FindAllRecipes'
import { Recipe, RecipeProps } from '~/recipe/models/Recipe'

describe('FindAllRecipes', () => {
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

    it('deve buscar todas as receitas', async () => {
        const findRecipe = new FindAllRecipes(recipeRepositoryProvider)

        await expect(findRecipe.execute()).resolves.toStrictEqual([
            new Recipe(recipe)
        ])
    })
})
