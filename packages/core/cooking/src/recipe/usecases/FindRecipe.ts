import type { UseCase } from '@core/shared'

import { Id } from '@core/shared'

import type { RecipeRepositoryProvider } from '../providers/RecipeRepositoryProvider'
import type { Recipe } from '../models/Recipe'

export interface FindRecipeInput {
    id: string
}

export type FindRecipeOutput = Recipe | null

export class FindRecipe implements UseCase<FindRecipeInput, FindRecipeOutput> {
    constructor(
        private readonly recipeRepositoryProvider: RecipeRepositoryProvider
    ) {}

    async execute(input: FindRecipeInput): Promise<FindRecipeOutput> {
        const id = new Id(input.id)

        const recipe = await this.recipeRepositoryProvider.findById(id.value)

        return recipe
    }
}
