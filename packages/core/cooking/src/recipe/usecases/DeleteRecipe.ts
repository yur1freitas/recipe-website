import type { UseCase } from '@core/shared'

import { CookingError } from '~/shared/errors/CookingError'

import type { RecipeRepositoryProvider } from '../providers/RecipeRepositoryProvider'

export interface DeleteRecipeInput {
    id: string
}

export type DeleteRecipeOutput = void

export enum DeleteRecipeErrors {
    RecipeDoesNotExist = 'RECIPE_DOES_NOT_EXIST',
    FailedDelete = 'FAILED_DELETE_RECIPE'
}

export class DeleteRecipe implements UseCase<
    DeleteRecipeInput,
    DeleteRecipeOutput
> {
    constructor(
        private readonly recipeRepositoryProvider: RecipeRepositoryProvider
    ) {}

    async execute(input: DeleteRecipeInput): Promise<DeleteRecipeOutput> {
        const { id } = input

        const exists = await this.recipeRepositoryProvider.existsById(id)
        const notExists = !exists

        if (notExists) {
            throw new CookingError({
                code: DeleteRecipeErrors.RecipeDoesNotExist,
                message: 'A receita a ser deletada não existe'
            })
        }

        const isSuccess = await this.recipeRepositoryProvider.delete(id)
        const isFailed = !isSuccess

        if (isFailed) {
            throw new CookingError({
                code: DeleteRecipeErrors.FailedDelete,
                message: 'Não foi possível deletar a receita'
            })
        }
    }
}
