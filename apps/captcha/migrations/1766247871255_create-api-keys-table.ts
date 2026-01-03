import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('api_keys')
        .ifNotExists()
        .addColumn('id', 'text', (col) => col.primaryKey().notNull())
        .addColumn('name', 'varchar(120)', (col) => col.notNull())
        .addColumn('token', 'text', (col) => col.unique().notNull())
        .addColumn('created_at', 'integer', (col) => col.notNull())
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('api_keys').ifExists().execute()
}
