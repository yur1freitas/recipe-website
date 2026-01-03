import type { Recipe } from '../models/Recipe'

export interface RecipeRepositoryProvider {
    create(recipe: Recipe): Promise<boolean>
    update(recipe: Recipe): Promise<void>
    delete(id: string): Promise<void>
    findAll(): Promise<Recipe[]>
    findById(id: string): Promise<Recipe | null>
    findByAuthor(id: string): Promise<Recipe[]>
    existsById(id: string): Promise<boolean>
}
