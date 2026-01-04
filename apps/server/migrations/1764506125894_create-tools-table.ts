import type { Kysely } from 'kysely'

import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('tools')
        .ifNotExists()
        .addColumn('pk', 'serial', (col) =>
            col
                .primaryKey()
                .notNull()
                .check(sql`pk >= 0`)
        )
        .addColumn('id', 'uuid', (col) => col.unique().notNull())
        .addColumn('recipe_id', 'uuid', (col) =>
            col.unique().notNull().references('recipes.id')
        )
        .addColumn('name', 'varchar(64)', (col) =>
            col.notNull().check(sql`LENGTH(name) >= 3`)
        )
        .addColumn('amount', 'integer', (col) =>
            col.notNull().check(sql`amount > 0`)
        )
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('tools').ifExists().execute()
}
