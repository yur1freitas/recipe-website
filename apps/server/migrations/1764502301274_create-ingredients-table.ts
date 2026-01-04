import type { Kysely } from 'kysely'

import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('ingredients')
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
        .addColumn('name', 'varchar(120)', (col) =>
            col.notNull().check(sql`LENGTH(name) >= 3`)
        )
        .addColumn('unit', 'varchar(5)', (col) => col.notNull())
        .addColumn('measure', 'varchar(120)', (col) => col.notNull())
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('ingredients').ifExists().execute()
}
