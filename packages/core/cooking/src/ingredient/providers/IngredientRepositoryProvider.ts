import type { Ingredient } from '../models/Ingredient'

export interface IngredientRepositoryProvider {
    create(ingredient: Ingredient): Promise<void>
    update(ingredient: Ingredient): Promise<void>
    delete(id: string): Promise<void>
    findAll(): Promise<Ingredient[]>
    findById(id: string): Promise<Ingredient | null>
    findByRecipe(id: string): Promise<Ingredient[]>
    existsById(id: string): Promise<boolean>
}
