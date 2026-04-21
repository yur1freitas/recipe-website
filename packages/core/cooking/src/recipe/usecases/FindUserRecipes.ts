import type { UseCase } from '@core/shared'
import type { UserRepositoryProvider } from '@core/auth'

import { Email, Id } from '@core/shared'

import { CookingError } from '~/shared/errors/CookingError'

import type { RecipeRepositoryProvider } from '../providers/RecipeRepositoryProvider'
import type { Recipe } from '../models/Recipe'

export type FindUserRecipesInput =
    | { id: string; email?: never }
    | { email: string; id?: never }

export type FindUserRecipesOutput = Recipe[]

export enum FindUserRecipesErrors {
    MissingUserIdentifier = 'MISSING_USER_IDENTIFIER',
    UserDoesNotExist = 'USER_DOES_NOT_EXIST'
}

export class FindUserRecipes implements UseCase<
    FindUserRecipesInput,
    FindUserRecipesOutput
> {
    constructor(
        private readonly userRepositoryProvider: UserRepositoryProvider,
        private readonly recipeRepositoryProvider: RecipeRepositoryProvider
    ) {}

    async execute(input: FindUserRecipesInput): Promise<FindUserRecipesOutput> {
        const isMissingIdentifier = !('id' in input || 'email' in input)

        if (isMissingIdentifier) {
            throw new CookingError({
                code: FindUserRecipesErrors.MissingUserIdentifier,
                message: 'Um id ou endereço de email do usuário estão faltando'
            })
        }

        const identifier =
            'id' in input ? new Id(input.id) : new Email(input.email)

        const user =
            identifier instanceof Id
                ? await this.userRepositoryProvider.findById(identifier.value)
                : await this.userRepositoryProvider.findByEmail(
                      identifier.value
                  )

        if (!user) {
            throw new CookingError({
                code: FindUserRecipesErrors.UserDoesNotExist,
                message: 'Não foi possível encontrar o usuário'
            })
        }

        const recipes = await this.recipeRepositoryProvider.findByAuthor(
            user.id.value
        )

        return recipes
    }
}
