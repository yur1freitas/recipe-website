import type { RecipeProps } from '~/recipe/models/Recipe'

import { expect, describe, it, afterEach, beforeEach } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { randEmail, randEncryptedPassword, randId } from '@core/shared/mocks'
import { randUser, UserRepositoryProviderMock } from '@core/auth/mocks'
import type { UserProps } from '@core/auth'

import { randRecipe } from '~mocks/randRecipe'
import { RecipeRepositoryProviderMock } from '~mocks/providers/RecipeRepositoryProviderMock'

import { ValidatorError } from '@core/shared'
import type {
    FindUserRecipesInput
} from '~/recipe/usecases/FindUserRecipes';
import {
    FindUserRecipes
} from '~/recipe/usecases/FindUserRecipes'
import { Recipe } from '~/recipe/models/Recipe'

describe('FindUserRecipes', () => {
    let user: Required<UserProps>
    let userRepositroyProvider: UserRepositoryProviderMock

    let recipe: RecipeProps
    let recipeRepositoryProvider: RecipeRepositoryProviderMock

    afterEach(() => {
        faker.seed()
    })

    beforeEach(() => {
        user = randUser({ password: randEncryptedPassword() })
        userRepositroyProvider = new UserRepositoryProviderMock([
            [user.id, user]
        ])

        recipe = randRecipe({ authorId: user.id })
        recipeRepositoryProvider = new RecipeRepositoryProviderMock([
            [recipe.id, recipe]
        ])
    })

    it('deve buscar todas as receitas do usuário através do id', async () => {
        const findUserRecipes = new FindUserRecipes(
            userRepositroyProvider,
            recipeRepositoryProvider
        )

        await expect(
            findUserRecipes.execute({ id: user.id })
        ).resolves.toStrictEqual([new Recipe(recipe)])
    })

    it('deve buscar todas as receitas do usuário através do email', async () => {
        const findUserRecipes = new FindUserRecipes(
            userRepositroyProvider,
            recipeRepositoryProvider
        )

        await expect(
            findUserRecipes.execute({ email: user.email })
        ).resolves.toStrictEqual([new Recipe(recipe)])
    })

    it('deve lançar um erro se não for fornecido nenhum identificador', async () => {
        const findUserRecipes = new FindUserRecipes(
            userRepositroyProvider,
            recipeRepositoryProvider
        )

        await expect(
            findUserRecipes.execute({} as FindUserRecipesInput)
        ).rejects.toThrowError(
            'Um id ou endereço de email do usuário estão faltando'
        )
    })

    it('deve lançar um erro se não existir nenhum usuário com o id fornecido', async () => {
        const findUserRecipes = new FindUserRecipes(
            userRepositroyProvider,
            recipeRepositoryProvider
        )

        const id = randId()

        await expect(findUserRecipes.execute({ id })).rejects.toThrowError(
            'Não foi possível encontrar o usuário'
        )
    })

    it('deve lançar um erro se não existir nenhum usuário com o email fornecido', async () => {
        const findUserRecipes = new FindUserRecipes(
            userRepositroyProvider,
            recipeRepositoryProvider
        )

        const email = randEmail()

        await expect(findUserRecipes.execute({ email })).rejects.toThrowError(
            'Não foi possível encontrar o usuário'
        )
    })

    it('deve lançar um erro se o id for inválido', async () => {
        const findUserRecipes = new FindUserRecipes(
            userRepositroyProvider,
            recipeRepositoryProvider
        )

        const id = randId().slice(0, 5)

        await expect(findUserRecipes.execute({ id })).rejects.toThrowError(
            ValidatorError
        )
    })

    it('deve lançar um erro se o email for inválido', async () => {
        const findUserRecipes = new FindUserRecipes(
            userRepositroyProvider,
            recipeRepositoryProvider
        )

        const email = randEmail({ testCase: 'missing-domain' })

        await expect(findUserRecipes.execute({ email })).rejects.toThrowError(
            ValidatorError
        )
    })
})
