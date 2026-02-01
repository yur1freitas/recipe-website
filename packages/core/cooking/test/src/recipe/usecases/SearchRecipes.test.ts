import { expect, describe, it, afterEach, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randRecipe } from '~mocks/randRecipe'
import { RecipeRepositoryProviderMock } from '~mocks/providers/RecipeRepositoryProviderMock'

import type { RecipeProps } from '~/recipe/models/Recipe'

import { SearchRecipes } from '~/recipe/usecases/SearchRecipes'
import { Recipe } from '~/recipe/models/Recipe'

describe('SearchRecipes', () => {
    let recipes: RecipeProps[]
    let recipeRepositoryProvider: RecipeRepositoryProviderMock

    afterEach(() => {
        faker.seed()
    })

    beforeEach(() => {
        recipes = [
            randRecipe({ name: 'Pão de Queijo' }),
            randRecipe({ name: 'Pudim' }),
            randRecipe({ name: 'Bolo' })
        ]

        recipeRepositoryProvider = new RecipeRepositoryProviderMock(
            recipes.map((recipe) => [recipe.id, recipe])
        )
    })

    it('deve buscar uma receita pelo nome', async () => {
        const searchRecipes = new SearchRecipes(recipeRepositoryProvider)

        await expect(searchRecipes.execute({ name: 'P' })).resolves.toEqual([
            new Recipe(recipes[0]),
            new Recipe(recipes[1])
        ])
    })

    it('deve retornar um array vazio se não encontrar nenhuma receita', async () => {
        const searchRecipes = new SearchRecipes(recipeRepositoryProvider)

        await expect(
            searchRecipes.execute({ name: 'Pastel' })
        ).resolves.toStrictEqual([])
    })
})
