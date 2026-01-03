import type { UseCase } from '@core/shared'
import type { RecipeRepositoryProvider } from '../providers/RecipeRepositoryProvider'
import type { RecipeInput } from '../models/Recipe'
import { CookingError } from '~/shared/errors/CookingError'
import { Recipe } from '../models/Recipe'

export type RegisterRecipeInput = RecipeInput

export type RegisterRecipeOutput = void

export enum RegisterRecipeErrors {
    FailedRegister = 'FAILED_REGISTER_RECIPE'
}

export class RegisterRecipe implements UseCase<
    RegisterRecipeInput,
    RegisterRecipeOutput
> {
    constructor(
        private readonly recipeRepositoryProvider: RecipeRepositoryProvider
    ) {}

    async execute(input: RegisterRecipeInput): Promise<RegisterRecipeOutput> {
        const recipe = new Recipe(input)

        const isSuccess = await this.recipeRepositoryProvider.create(recipe)
        const isFailed = !isSuccess

        if (isFailed) {
            throw new CookingError({
                code: RegisterRecipeErrors.FailedRegister,
                message: 'Não foi possível cadastrár a receita'
            })
        }
    }
}
