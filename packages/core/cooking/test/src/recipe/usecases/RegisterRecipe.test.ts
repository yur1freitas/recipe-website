import { expect, describe, it, afterEach, beforeEach, vi } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { RecipeRepositoryProviderMock } from '~mocks/providers/RecipeRepositoryProviderMock'
import { randRecipe } from '~mocks/randRecipe'

import { RegisterRecipe } from '~/recipe/usecases/RegisterRecipe'

describe('RegisterRecipe', () => {
    let recipeRepositoryProvider: RecipeRepositoryProviderMock

    afterEach(() => {
        faker.seed()
    })

    beforeEach(() => {
        recipeRepositoryProvider = new RecipeRepositoryProviderMock()
    })

    it('deve cadastrar uma receita', async () => {
        const registerRecipe = new RegisterRecipe(recipeRepositoryProvider)

        const input = randRecipe()

        await expect(registerRecipe.execute(input)).resolves.toBeNullable()

        expect(recipeRepositoryProvider.findAll()).toHaveLength(1)
    })

    it('deve lançar um erro se não for possível cadastrar uma receita', async () => {
        const registerRecipe = new RegisterRecipe(recipeRepositoryProvider)

        const input = randRecipe()

        const mock = vi
            .spyOn(recipeRepositoryProvider, 'create')
            .mockReturnValue(false)

        await expect(registerRecipe.execute(input)).rejects.toThrowError(
            'Não foi possível cadastrár a receita'
        )

        expect(recipeRepositoryProvider.findAll()).toHaveLength(0)

        mock.mockRestore()
    })
})
