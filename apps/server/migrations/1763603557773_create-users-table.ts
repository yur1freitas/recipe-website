import type { Kysely } from 'kysely'

import { sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('users')
        .ifNotExists()
        .addColumn('pk', 'serial', (col) =>
            col
                .primaryKey()
                .notNull()
                .check(sql`pk >= 0`)
        )
        .addColumn('id', 'uuid', (col) => col.unique().notNull())
        .addColumn('name', 'varchar(120)', (col) =>
            col.notNull().check(sql`LENGTH(name) >= 3`)
        )
        .addColumn('email', 'varchar(120)', (col) => col.unique().notNull())
        .addColumn('password', 'text', (col) => col.notNull())
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('users').ifExists().execute()
}
