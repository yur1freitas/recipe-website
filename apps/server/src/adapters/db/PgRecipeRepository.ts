import { eq, sql } from 'drizzle-orm'

import type { RecipeRepositoryProvider } from '@core/cooking'
import { Recipe } from '@core/cooking'

import { toolsTable } from '~/db/schemas/tools'
import { stepsTable } from '~/db/schemas/steps'
import { recipesTable } from '~/db/schemas/recipes'
import { ingredientsTable } from '~/db/schemas/ingredients'
import { pg } from '~/db/pg'
import { app } from '~/app'

export class PgRecipeRepository implements RecipeRepositoryProvider {
    async create(recipe: Recipe): Promise<boolean> {
        try {
            await pg.transaction(async (tx) => {
                await tx.insert(recipesTable).values(recipe.props)

                if (recipe.steps.length > 0) {
                    const steps = recipe.steps
                        .map((step) => ({
                            recipeId: recipe.id.value,
                            ...step.props
                        }))
                        .toArray()

                    await tx.insert(stepsTable).values(steps)
                }

                if (recipe.tools.length > 0) {
                    const tools = recipe.tools
                        .map((step) => ({
                            recipeId: recipe.id.value,
                            ...step.props
                        }))
                        .toArray()

                    await tx.insert(toolsTable).values(tools)
                }

                if (recipe.ingredients.length > 0) {
                    const ingredients = recipe.ingredients
                        .map((ingredient) => ({
                            recipeId: recipe.id.value,
                            ...ingredient.props
                        }))
                        .toArray()

                    await tx.insert(ingredientsTable).values(ingredients)
                }
            })

            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async update(recipe: Recipe): Promise<boolean> {
        try {
            await pg.transaction(async (tx) => {
                await tx
                    .update(recipesTable)
                    .set({
                        name: recipe.name.value,
                        description: recipe.description.value,
                        difficulty: recipe.difficulty.value,
                        preparationTime: recipe.preparationTime.value
                    })
                    .where(eq(recipesTable.id, recipe.id.value))

                if (recipe.steps.length > 0) {
                    const steps = recipe.steps
                        .map((step) => ({
                            recipeId: recipe.id.value,
                            ...step.props
                        }))
                        .toArray()

                    await tx
                        .insert(stepsTable)
                        .values(steps)
                        .onConflictDoUpdate({
                            target: stepsTable.id,
                            set: {
                                order: sql.raw(`excluded.${stepsTable.order}`),
                                description: sql.raw(
                                    `excluded.${stepsTable.description}`
                                )
                            }
                        })
                }

                if (recipe.tools.length > 0) {
                    const tools = recipe.tools
                        .map((step) => ({
                            recipeId: recipe.id.value,
                            ...step.props
                        }))
                        .toArray()

                    await tx
                        .insert(toolsTable)
                        .values(tools)
                        .onConflictDoUpdate({
                            target: toolsTable.id,
                            set: {
                                name: sql.raw(`excluded.${toolsTable.name}`),
                                amount: sql.raw(`excluded.${toolsTable.amount}`)
                            }
                        })
                }

                if (recipe.ingredients.length > 0) {
                    const ingredients = recipe.ingredients
                        .map((ingredient) => ({
                            recipeId: recipe.id.value,
                            ...ingredient.props
                        }))
                        .toArray()

                    await tx
                        .insert(ingredientsTable)
                        .values(ingredients)
                        .onConflictDoUpdate({
                            target: ingredientsTable.id,
                            set: {
                                name: sql.raw(
                                    `excluded.${ingredientsTable.name}`
                                ),
                                unit: sql.raw(
                                    `excluded.${ingredientsTable.unit}`
                                ),
                                measure: sql.raw(
                                    `excluded.${ingredientsTable.measure}`
                                )
                            }
                        })
                }
            })

            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await pg.transaction(async (tx) => {
                await tx.delete(stepsTable).where(eq(stepsTable.id, id))

                await tx.delete(toolsTable).where(eq(toolsTable.id, id))

                await tx
                    .delete(ingredientsTable)
                    .where(eq(ingredientsTable.id, id))

                await tx.delete(recipesTable).where(eq(recipesTable.id, id))
            })

            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async findAll(): Promise<Recipe[]> {
        const rows = await pg.query.recipes.findMany({
            columns: {
                pk: false
            },
            with: {
                tools: { columns: { pk: false } },
                steps: { columns: { pk: false } },
                ingredients: { columns: { pk: false } }
            }
        })

        return rows.map((row) => new Recipe(row))
    }

    async findById(id: string): Promise<Recipe | null> {
        const row = await pg.query.recipes.findFirst({
            columns: {
                pk: false
            },
            with: {
                tools: { columns: { pk: false } },
                steps: { columns: { pk: false } },
                ingredients: { columns: { pk: false } }
            },
            where: (fields, { eq }) => eq(fields.id, id)
        })

        return row ? new Recipe(row) : null
    }

    async findByAuthor(id: string): Promise<Recipe[]> {
        const rows = await pg.query.recipes.findMany({
            columns: {
                pk: false
            },
            with: {
                tools: { columns: { pk: false } },
                steps: { columns: { pk: false } },
                ingredients: { columns: { pk: false } }
            },
            where: (fields, { eq }) => eq(fields.authorId, id)
        })

        return rows.map((row) => new Recipe(row))
    }

    async existsById(id: string): Promise<boolean> {
        const row = await pg.query.recipes.findFirst({
            columns: { id: true },
            where: (fields, { eq }) => eq(fields.id, id)
        })

        return Boolean(row)
    }
}
