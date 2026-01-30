import { eq, inArray } from 'drizzle-orm'

import type { Ensure } from '@core/shared'
import type { UserProps, UserRepositoryProvider } from '@core/auth'
import { User } from '@core/auth'

import { usersTable } from '~/db/schemas/users'
import { toolsTable } from '~/db/schemas/tools'
import { stepsTable } from '~/db/schemas/steps'
import { recipesTable } from '~/db/schemas/recipes'
import { ingredientsTable } from '~/db/schemas/ingredients'
import { pg } from '~/db/pg'
import { app } from '~/app'

export class PgUserRepository implements UserRepositoryProvider {
    async create(user: User): Promise<boolean> {
        try {
            await pg
                .insert(usersTable)
                .values(user.props as Ensure<UserProps, 'password'>)

            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async delete(id: string): Promise<void> {
        await pg.transaction(async (tx) => {
            const rows = await tx
                .select({ id: recipesTable.id })
                .from(recipesTable)
                .where(eq(recipesTable.authorId, id))

            const recipeIds = rows.map((row) => row.id)

            await tx
                .delete(stepsTable)
                .where(inArray(recipesTable.id, recipeIds))

            await tx
                .delete(toolsTable)
                .where(inArray(recipesTable.id, recipeIds))

            await tx
                .delete(ingredientsTable)
                .where(inArray(recipesTable.id, recipeIds))

            await tx
                .delete(recipesTable)
                .where(inArray(recipesTable.id, recipeIds))

            await tx.delete(usersTable).where(eq(usersTable.id, id))
        })
    }

    async update(user: User): Promise<void> {
        await pg
            .update(usersTable)
            .set(user.props)
            .where(eq(usersTable.id, user.id.value))
    }

    async findAll(): Promise<User[]> {
        const rows = await pg.query.users.findMany({
            columns: { pk: false }
        })

        return rows.map((row) => new User(row))
    }

    async findById(id: string): Promise<User | null> {
        const row = await pg.query.users.findFirst({
            columns: { pk: false },
            where: (fields, { eq }) => eq(fields.id, id)
        })

        return row ? new User(row) : null
    }

    async findByEmail(email: string): Promise<User | null> {
        const row = await pg.query.users.findFirst({
            columns: { pk: false },
            where: (fields, { eq }) => eq(fields.email, email)
        })

        return row ? new User(row) : null
    }

    async existsById(id: string): Promise<boolean> {
        const row = await pg.query.users.findFirst({
            columns: { id: true },
            where: (fields, { eq }) => eq(fields.id, id)
        })

        return Boolean(row)
    }

    async existsByEmail(email: string): Promise<boolean> {
        const row = await pg.query.users.findFirst({
            columns: { id: true },
            where: (fields, { eq }) => eq(fields.email, email)
        })

        return Boolean(row)
    }
}
