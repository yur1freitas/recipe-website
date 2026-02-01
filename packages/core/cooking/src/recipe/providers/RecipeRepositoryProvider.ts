import type { Awaitable } from '@core/shared'

import type { Recipe } from '../models/Recipe'

export interface RecipeRepositoryProvider {
    create(recipe: Recipe): Awaitable<boolean>
    update(recipe: Recipe): Awaitable<boolean>
    delete(id: string): Awaitable<boolean>
    findAll(): Awaitable<Recipe[]>
    findById(id: string): Awaitable<Recipe | null>
    findByAuthor(id: string): Awaitable<Recipe[]>
    existsById(id: string): Awaitable<boolean>
}
