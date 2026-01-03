import type { RecipeRepositoryProvider } from '@core/cooking'
import { Recipe } from '@core/cooking'

import type { Pool } from 'pg'

import { app } from '~/app'

export class PgRecipeRepository implements RecipeRepositoryProvider {
    constructor(private $pool: Pool) {}

    async create(recipe: Recipe): Promise<boolean> {
        // TODO: criar registros em tabelas relacionadas (steps, tools, ingredients)

        try {
            const query = `
            INSERT INTO 
                recipes (
                    id, 
                    author_id,
                    name,
                    description,
                    difficulty,
                    preparation_time
                )
            VALUES
                ($1, $2, $3, $4, $5, $6)
        `

            await this.$pool.query(query, [
                recipe.id.value,
                recipe.authorId.value,
                recipe.name.value,
                recipe.description.value,
                recipe.difficulty.value,
                recipe.preparationTime.value
            ])

            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async update(recipe: Recipe): Promise<void> {
        // TODO: atualizar tabelas relacionadas (steps, tools, ingredients)

        const query = `
            UPDATE users SET 
                name = $1, 
                description = $2, 
                difficulty = $3 
                preparationTime = $4
            WHERE 
                id = $5
        `

        await this.$pool.query(query, [
            recipe.name.value,
            recipe.description.value,
            recipe.difficulty.value,
            recipe.preparationTime.value,
            recipe.id.value
        ])
    }

    async delete(id: string): Promise<void> {
        const query = `
            DELETE FROM recipes
            WHERE
                id = $id
        `

        await this.$pool.query(query, [id])
    }

    async findAll(): Promise<Recipe[]> {
        const query = 'SELECT * FROM recipes'

        const { rows } = await this.$pool.query(query)

        const users = rows.map((row) => new Recipe(row))

        return users
    }

    async findById(id: string): Promise<Recipe | null> {
        const query = `
            SELECT * FROM recipes 
            WHERE 
                id = $1
            RETURNING
                id, 
                author_id as authorId, 
                name, 
                description, 
                difficulty, 
                preparation_time as preparationTime
        `

        const { rowCount, rows } = await this.$pool.query(query, [id])

        if (rowCount === 1) {
            return new Recipe(rows[0])
        }

        return null
    }

    async findByAuthor(id: string): Promise<Recipe[]> {
        const query = `
            SELECT * FROM recipes 
            WHERE 
                author_id = $1
            RETURNING
                id, 
                author_id as authorId, 
                name, 
                description, 
                difficulty, 
                preparation_time as preparationTime
        `

        const { rows } = await this.$pool.query(query, [id])

        const recipes = rows.map((row) => new Recipe(row))
        return recipes
    }

    async existsById(id: string): Promise<boolean> {
        const query = `
            SELECT EXISTS (
                SELECT 1 FROM recipes 
                WHERE 
                    id = $1
            )
        `

        const { rowCount, rows } = await this.$pool.query(query, [id])

        if (rowCount === 1) {
            return rows[0].exists
        }

        return false
    }
}
