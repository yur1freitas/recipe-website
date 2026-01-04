import type { UseCase } from '@core/shared'

import type { RecipeRepositoryProvider } from '../providers/RecipeRepositoryProvider'
import type { Recipe } from '../models/Recipe'

export type FindAllRecipesInput = never
export type FindAllRecipesOutput = Recipe[]

export class FindAllRecipes implements UseCase<
    FindAllRecipesInput,
    FindAllRecipesOutput
> {
    constructor(
        private readonly recipeRepositoryProvider: RecipeRepositoryProvider
    ) {}

    async execute(): Promise<FindAllRecipesOutput> {
        const recipes = await this.recipeRepositoryProvider.findAll()

        return recipes
    }
}
