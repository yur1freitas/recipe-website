import type { UseCase } from '@core/shared'
import type { RecipeRepositoryProvider } from '../providers/RecipeRepositoryProvider'
import type { RecipeInput } from '../models/Recipe'
import { CookingError } from '~/shared/errors/CookingError'
import { Recipe } from '../models/Recipe'

export type UpdateRecipeInput = RecipeInput

export type UpdateRecipeOutput = void

export enum UpdateRecipeErrors {
    RecipeDoesNotExist = 'RECIPE_DOES_NOT_EXIST',
    FailedUpdate = 'FAILED_Update_RECIPE'
}

export class UpdateRecipe implements UseCase<
    UpdateRecipeInput,
    UpdateRecipeOutput
> {
    constructor(
        private readonly recipeRepositoryProvider: RecipeRepositoryProvider
    ) {}

    async execute(input: UpdateRecipeInput): Promise<UpdateRecipeOutput> {
        const recipe = new Recipe(input)

        const exists = await this.recipeRepositoryProvider.existsById(
            recipe.id.value
        )
        const notExists = !exists

        if (notExists) {
            throw new CookingError({
                code: UpdateRecipeErrors.RecipeDoesNotExist,
                message: 'A receita a ser atualizada não existe'
            })
        }

        const isSuccess = await this.recipeRepositoryProvider.update(recipe)
        const isFailed = !isSuccess

        if (isFailed) {
            throw new CookingError({
                code: UpdateRecipeErrors.FailedUpdate,
                message: 'Não foi possível atualizar a receita'
            })
        }
    }
}
