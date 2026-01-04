import type { Kysely } from 'kysely'

import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    const pgType = await db
        .selectFrom('pg_type')
        .where('typname', '=', 'difficulty')
        .executeTakeFirst()

    if (!pgType) {
        db.schema
            .createType('difficulty')
            .asEnum(['easy', 'medium', 'hard'])
            .execute()
    }

    await db.schema
        .createTable('recipes')
        .ifNotExists()
        .addColumn('pk', 'serial', (col) =>
            col
                .primaryKey()
                .notNull()
                .check(sql`pk >= 0`)
        )
        .addColumn('id', 'uuid', (col) => col.unique().notNull())
        .addColumn('author_id', 'uuid', (col) =>
            col.unique().notNull().references('users.id')
        )
        .addColumn('name', 'varchar(64)', (col) =>
            col.notNull().check(sql`LENGTH(name) >= 3`)
        )
        .addColumn('description', 'varchar(256)', (col) => col.notNull())
        .addColumn('difficulty', sql`difficulty`, (col) => col.notNull())
        .addColumn('preparation_time', 'integer', (col) =>
            col.notNull().check(sql`preparation_time > 0`)
        )
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('recipes').ifExists().execute()

    await db.schema.dropType('difficulty').ifExists().execute()
}
