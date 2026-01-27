import { expect, describe, it, afterEach, beforeEach, vi } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randRecipe } from '~mocks/randRecipe'
import { RecipeRepositoryProviderMock } from '~mocks/providers/RecipeRepositoryProviderMock'

import type { RecipeProps } from '~/recipe/models/Recipe'

import { DeleteRecipe } from '~/recipe/usecases/DeleteRecipe'

describe('DeleteRecipe', () => {
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

    it('deve deletar uma receita', async () => {
        const deleteRecipe = new DeleteRecipe(recipeRepositoryProvider)

        await expect(
            deleteRecipe.execute({ id: recipe.id })
        ).resolves.toBeNullable()
    })

    it('deve lançar um erro ao tentar deletar uma receita não cadastrada', async () => {
        const deleteRecipe = new DeleteRecipe(recipeRepositoryProvider)

        const recipe = randRecipe()

        await expect(
            deleteRecipe.execute({ id: recipe.id })
        ).rejects.toThrowError('A receita a ser deletada não existe')
    })

    it('deve lançar um erro se não for possível deletar uma receita', async () => {
        const deleteRecipe = new DeleteRecipe(recipeRepositoryProvider)

        const mock = vi
            .spyOn(recipeRepositoryProvider, 'delete')
            .mockReturnValue(false)

        await expect(deleteRecipe.execute(recipe)).rejects.toThrowError(
            'Não foi possível deletar a receita'
        )

        mock.mockRestore()
    })
})
