import { expect, describe, it, afterEach, beforeEach, vi } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randRecipe } from '~mocks/randRecipe'
import { RecipeRepositoryProviderMock } from '~mocks/providers/RecipeRepositoryProviderMock'

import type { RecipeProps } from '~/recipe/models/Recipe'

import { UpdateRecipe } from '~/recipe/usecases/UpdateRecipe'

describe('UpdateRecipe', () => {
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

    it('deve atualizar uma receita', async () => {
        const updateRecipe = new UpdateRecipe(recipeRepositoryProvider)
        const updatedRecipe = randRecipe({ id: recipe.id })

        await expect(
            updateRecipe.execute(updatedRecipe)
        ).resolves.toBeNullable()
    })

    it('deve lançar um erro ao tentar atualizar uma receita não cadastrada', async () => {
        const updateRecipe = new UpdateRecipe(recipeRepositoryProvider)

        const recipe = randRecipe()

        await expect(updateRecipe.execute(recipe)).rejects.toThrowError(
            'A receita a ser atualizada não existe'
        )
    })

    it('deve lançar um erro se não for possível atualizar uma receita', async () => {
        const updateRecipe = new UpdateRecipe(recipeRepositoryProvider)

        const mock = vi
            .spyOn(recipeRepositoryProvider, 'update')
            .mockReturnValue(false)

        await expect(updateRecipe.execute(recipe)).rejects.toThrowError(
            'Não foi possível atualizar a receita'
        )

        mock.mockRestore()
    })
})
