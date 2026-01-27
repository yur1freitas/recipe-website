import type { Kysely } from 'kysely'

import type { UserRepositoryProvider } from '@core/auth'
import { User } from '@core/auth'

import type { DB } from '~/db/schema'

import { app } from '~/app'

export class PgUserRepository implements UserRepositoryProvider {
    constructor(private $db: Kysely<DB>) {}

    async create(user: User): Promise<boolean> {
        try {
            await this.$db
                .insertInto('users')
                .values({
                    id: user.id.value,
                    name: user.name.value,
                    email: user.email.value,
                    password: user.password!.value
                })
                .execute()

            return true
        } catch (err) {
            app.log.error(err)
            return false
        }
    }

    async delete(id: string): Promise<void> {
        await this.$db.transaction().execute(async (trx) => {
            const rows = await trx
                .selectFrom('recipes')
                .select(['id'])
                .where('authorId', '=', id)
                .execute()

            const ids = rows.map((row) => row.id)

            await trx.deleteFrom('steps').where('recipeId', 'in', ids).execute()
            await trx.deleteFrom('tools').where('recipeId', 'in', ids).execute()
            await trx
                .deleteFrom('ingredients')
                .where('recipeId', 'in', ids)
                .execute()

            await trx.deleteFrom('recipes').where('authorId', '=', id).execute()

            await this.$db
                .deleteFrom('users')
                .where('id', '=', id)
                .executeTakeFirst()
        })
    }

    async update(user: User): Promise<void> {
        await this.$db
            .updateTable('users')
            .set({
                name: user.name.value,
                email: user.email.value,
                password: user.password?.value
            })
            .where('id', '=', user.id.value)
            .executeTakeFirst()
    }

    async findAll(): Promise<User[]> {
        const rows = await this.$db
            .selectFrom('users')
            .select(['id', 'name', 'email', 'password'])
            .execute()

        const users = rows.map((row) => new User(row))

        return users
    }

    async findById(id: string): Promise<User | null> {
        const row = await this.$db
            .selectFrom('users')
            .select(['id', 'name', 'email', 'password'])
            .where('id', '=', id)
            .executeTakeFirst()

        if (row) {
            const user = new User(row)
            return user
        }

        return null
    }

    async findByEmail(email: string): Promise<User | null> {
        const row = await this.$db
            .selectFrom('users')
            .select(['id', 'name', 'email', 'password'])
            .where('email', '=', email)
            .executeTakeFirst()

        if (row) {
            const user = new User(row)
            return user
        }

        return null
    }

    async existsById(id: string): Promise<boolean> {
        const row = await this.$db
            .selectFrom('users')
            .select([])
            .where('id', '=', id)
            .executeTakeFirst()

        return Boolean(row)
    }

    async existsByEmail(email: string): Promise<boolean> {
        const row = await this.$db
            .selectFrom('users')
            .select([])
            .where('email', '=', email)
            .executeTakeFirst()

        return Boolean(row)
    }
}
