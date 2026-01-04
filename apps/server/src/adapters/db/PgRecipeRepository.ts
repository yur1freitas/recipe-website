import type { Kysely } from 'kysely'
import type { RecipeInput, RecipeRepositoryProvider } from '@core/cooking'

import type { DB } from '~/db/schema'

import { Recipe } from '@core/cooking'

import { Time } from '@core/time'
import { app } from '~/app'

export class PgRecipeRepository implements RecipeRepositoryProvider {
    constructor(private $db: Kysely<DB>) {}

    async create(recipe: Recipe): Promise<boolean> {
        // TODO: criar registros em tabelas relacionadas (steps, tools, ingredients)
        try {
            await this.$db
                .insertInto('recipes')
                .values({
                    id: recipe.id.value,
                    name: recipe.name.value,
                    authorId: recipe.authorId.value,
                    difficulty: recipe.difficulty.value,
                    description: recipe.description.value,
                    preparationTime: recipe.preparationTime.ms
                })
                .execute()

            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async update(recipe: Recipe): Promise<void> {
        // TODO: atualizar tabelas relacionadas (steps, tools, ingredients)

        await this.$db
            .updateTable('recipes')
            .set({
                name: recipe.name.value,
                authorId: recipe.authorId.value,
                difficulty: recipe.difficulty.value,
                description: recipe.description.value
            })
            .where('id', '=', recipe.id.value)
            .execute()
    }

    async delete(id: string): Promise<void> {
        await this.$db.deleteFrom('recipes').where('id', '=', id).execute()
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
            .execute()

        const recipes = rows.map(
            (row) =>
                new Recipe({
                    ...row,
                    tools: [],
                    steps: [],
                    ingredients: [],
                    preparationTime: new Time({ ms: row.preparationTime })
                } as RecipeInput)
        )

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
            .executeTakeFirst()

        if (row) {
            const recipe = new Recipe({
                ...row,
                tools: [],
                steps: [],
                ingredients: [],
                preparationTime: new Time({ ms: row.preparationTime })
            } as RecipeInput)
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
            .execute()

        const recipes = rows.map(
            (row) =>
                new Recipe({
                    ...row,
                    tools: [],
                    steps: [],
                    ingredients: [],
                    preparationTime: new Time({ ms: row.preparationTime })
                } as RecipeInput)
        )

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
