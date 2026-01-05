import type { Kysely } from 'kysely'
import type { RecipeRepositoryProvider } from '@core/cooking'

import type { DB } from '~/db/schema'

import { jsonArrayFrom } from 'kysely/helpers/postgres'

import { Recipe } from '@core/cooking'

import { app } from '~/app'

export class PgRecipeRepository implements RecipeRepositoryProvider {
    constructor(private $db: Kysely<DB>) {}

    async create(recipe: Recipe): Promise<boolean> {
        try {
            await this.$db.transaction().execute(async (trx) => {
                await trx
                    .insertInto('recipes')
                    .values({
                        id: recipe.id.value,
                        name: recipe.name.value,
                        authorId: recipe.authorId.value,
                        difficulty: recipe.difficulty.value,
                        description: recipe.description.value,
                        preparationTime: recipe.preparationTime.value
                    })
                    .execute()

                if (recipe.ingredients.length > 0) {
                    await trx
                        .insertInto('ingredients')
                        .values(
                            recipe.ingredients.toArray().map((i) => ({
                                id: i.id.value,
                                recipeId: recipe.id.value,
                                name: i.name.value,
                                unit: i.unit.value,
                                measure: i.measure.value
                            }))
                        )
                        .execute()
                }

                if (recipe.steps.length > 0) {
                    await trx
                        .insertInto('steps')
                        .values(
                            recipe.steps.toArray().map((s) => ({
                                id: s.id.value,
                                recipeId: recipe.id.value,
                                order: s.order.value,
                                description: s.description.value
                            }))
                        )
                        .execute()
                }

                if (recipe.tools.length > 0) {
                    await trx
                        .insertInto('tools')
                        .values(
                            recipe.tools.toArray().map((t) => ({
                                id: t.id.value,
                                recipeId: recipe.id.value,
                                name: t.name.value,
                                amount: t.amount.value
                            }))
                        )
                        .execute()
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
            await this.$db.transaction().execute(async (trx) => {
                await trx
                    .updateTable('recipes')
                    .set({
                        name: recipe.name.value,
                        authorId: recipe.authorId.value,
                        difficulty: recipe.difficulty.value,
                        description: recipe.description.value,
                        preparationTime: recipe.preparationTime.value
                    })
                    .where('id', '=', recipe.id.value)
                    .executeTakeFirst()

                await Promise.all([
                    trx
                        .deleteFrom('tools')
                        .where('recipeId', '=', recipe.id.value)
                        .execute(),
                    trx
                        .deleteFrom('steps')
                        .where('recipeId', '=', recipe.id.value)
                        .execute(),
                    trx
                        .deleteFrom('ingredients')
                        .where('recipeId', '=', recipe.id.value)
                        .execute()
                ])

                await Promise.all([
                    trx
                        .insertInto('ingredients')
                        .values(
                            recipe.ingredients.toArray().map((i) => ({
                                id: i.id.value,
                                recipeId: recipe.id.value,
                                name: i.name.value,
                                unit: i.unit.value,
                                measure: i.measure.value
                            }))
                        )
                        .execute(),
                    trx
                        .insertInto('steps')
                        .values(
                            recipe.steps.toArray().map((s) => ({
                                id: s.id.value,
                                recipeId: recipe.id.value,
                                order: s.order.value,
                                description: s.description.value
                            }))
                        )
                        .execute(),
                    trx
                        .insertInto('tools')
                        .values(
                            recipe.tools.toArray().map((t) => ({
                                id: t.id.value,
                                recipeId: recipe.id.value,
                                name: t.name.value,
                                amount: t.amount.value
                            }))
                        )
                        .execute()
                ])
            })
            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.$db.transaction().execute(async (trx) => {
                await trx
                    .deleteFrom('steps')
                    .where('recipeId', '=', id)
                    .execute()
                await trx
                    .deleteFrom('tools')
                    .where('recipeId', '=', id)
                    .execute()

                await trx
                    .deleteFrom('ingredients')
                    .where('recipeId', '=', id)
                    .execute()

                await trx
                    .deleteFrom('recipes')
                    .where('id', '=', id)
                    .executeTakeFirst()
            })

            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async findAll(): Promise<Recipe[]> {
        const rows = await this.$db
            .selectFrom('recipes')
            .select([
                'id',
                'authorId',
                'name',
                'description',
                'description',
                'difficulty',
                'preparationTime'
            ])
            .select((eb) => [
                jsonArrayFrom(
                    eb
                        .selectFrom('steps')
                        .select(['id', 'order', 'description'])
                        .whereRef('steps.recipeId', '=', 'recipes.id')
                ).as('steps'),
                jsonArrayFrom(
                    eb
                        .selectFrom('tools')
                        .select(['id', 'name', 'amount'])
                        .whereRef('tools.recipeId', '=', 'recipes.id')
                ).as('tools'),
                jsonArrayFrom(
                    eb
                        .selectFrom('ingredients')
                        .select(['id', 'name', 'unit', 'measure'])
                        .whereRef('ingredients.recipeId', '=', 'recipes.id')
                ).as('ingredients')
            ])
            .execute()

        const recipes = rows.map((row) => new Recipe(row))

        return recipes
    }

    async findById(id: string): Promise<Recipe | null> {
        const row = await this.$db
            .selectFrom('recipes')
            .select([
                'id',
                'authorId',
                'name',
                'description',
                'description',
                'difficulty',
                'preparationTime'
            ])
            .where('id', '=', id)
            .select((eb) => [
                jsonArrayFrom(
                    eb
                        .selectFrom('steps')
                        .select(['id', 'order', 'description'])
                        .whereRef('steps.recipeId', '=', 'recipes.id')
                ).as('steps'),
                jsonArrayFrom(
                    eb
                        .selectFrom('tools')
                        .select(['id', 'name', 'amount'])
                        .whereRef('tools.recipeId', '=', 'recipes.id')
                ).as('tools'),
                jsonArrayFrom(
                    eb
                        .selectFrom('ingredients')
                        .select(['id', 'name', 'unit', 'measure'])
                        .whereRef('ingredients.recipeId', '=', 'recipes.id')
                ).as('ingredients')
            ])
            .executeTakeFirst()

        if (row) {
            const recipe = new Recipe(row)

            return recipe
        }

        return null
    }

    async findByAuthor(id: string): Promise<Recipe[]> {
        const rows = await this.$db
            .selectFrom('recipes')
            .select([
                'id',
                'authorId',
                'name',
                'description',
                'description',
                'difficulty',
                'preparationTime'
            ])
            .where('authorId', '=', id)
            .select((eb) => [
                jsonArrayFrom(
                    eb
                        .selectFrom('steps')
                        .select(['id', 'order', 'description'])
                        .whereRef('steps.recipeId', '=', 'recipes.id')
                ).as('steps'),
                jsonArrayFrom(
                    eb
                        .selectFrom('tools')
                        .select(['id', 'name', 'amount'])
                        .whereRef('tools.recipeId', '=', 'recipes.id')
                ).as('tools'),
                jsonArrayFrom(
                    eb
                        .selectFrom('ingredients')
                        .select(['id', 'name', 'unit', 'measure'])
                        .whereRef('ingredients.recipeId', '=', 'recipes.id')
                ).as('ingredients')
            ])
            .execute()

        const recipes = rows.map((row) => new Recipe(row))

        return recipes
    }

    async existsById(id: string): Promise<boolean> {
        const row = await this.$db
            .selectFrom('recipes')
            .select([])
            .where('id', '=', id)
            .executeTakeFirst()

        return Boolean(row)
    }
}
