import type { RecipeRepositoryProvider } from '~/recipe/providers/RecipeRepositoryProvider'
import type { RecipeProps } from '~/recipe/models/Recipe'

import { Recipe } from '~/recipe/models/Recipe'

export class RecipeRepositoryProviderMock implements RecipeRepositoryProvider {
    private $store: Map<string, RecipeProps>

    constructor(entries?: Iterable<readonly [string, RecipeProps]>) {
        this.$store = new Map(entries)
    }

    create(recipe: Recipe): boolean {
        this.$store.set(recipe.id.value, recipe.props)
        return true
    }

    update(recipe: Recipe): boolean {
        this.$store.set(recipe.id.value, recipe.props)
        return true
    }

    delete(id: string): boolean {
        this.$store.delete(id)
        return true
    }

    findAll(): Recipe[] {
        return this.$store
            .values()
            .map((recipe) => new Recipe(recipe))
            .toArray()
    }

    findById(id: string): Recipe | null {
        const recipe = this.$store.values().find((recipe) => recipe.id === id)

        return recipe ? new Recipe(recipe) : null
    }

    findByAuthor(id: string): Recipe[] {
        const recipes = this.$store
            .values()
            .filter((recipe) => recipe.authorId === id)
            .map((recipe) => new Recipe(recipe))
            .toArray()

        return recipes
    }

    findByName(name: string): Recipe[] {
        const recipes = this.$store
            .values()
            .filter((recipe) =>
                recipe.name.toLowerCase().includes(name.toLowerCase())
            )
            .map((recipe) => new Recipe(recipe))
            .toArray()

        return recipes
    }

    existsById(id: string): boolean {
        const recipe = this.$store.values().find((recipe) => recipe.id === id)

        return Boolean(recipe)
    }
}
