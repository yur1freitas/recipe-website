import type { Kysely } from 'kysely'

import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('steps')
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
        .addColumn('order', 'integer', (col) =>
            col.notNull().check(sql`steps.order > 0`)
        )
        .addColumn('description', 'varchar(256)', (col) => col.notNull())
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('steps').ifExists().execute()
}
