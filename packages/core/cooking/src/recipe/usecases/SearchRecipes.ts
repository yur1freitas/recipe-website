import type { UseCase } from '@core/shared'

import type { RecipeRepositoryProvider } from '../providers/RecipeRepositoryProvider'
import type { Recipe } from '../models/Recipe'

export interface SearchRecipesInput {
    name: string
}

export type SearchRecipesOutput = Recipe[]

export class SearchRecipes implements UseCase<
    SearchRecipesInput,
    SearchRecipesOutput
> {
    constructor(
        private readonly recipeRepositoryProvider: RecipeRepositoryProvider
    ) {}

    async execute(input: SearchRecipesInput): Promise<SearchRecipesOutput> {
        const { name } = input

        if (name.trim().length === 0) {
            return []
        }

        const recipes = await this.recipeRepositoryProvider.findByName(name)

        return recipes
    }
}
