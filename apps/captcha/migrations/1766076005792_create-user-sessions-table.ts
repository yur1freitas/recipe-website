import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('user_sessions')
        .ifNotExists()
        .addColumn('id', 'text', (col) => col.primaryKey().notNull())
        .addColumn('access_token', 'text', (col) => col.unique().notNull())
        .addColumn('created_at', 'integer', (col) => col.notNull())
        .addColumn('expires_at', 'integer', (col) => col.notNull())
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('user_sessions').ifExists().execute()
}
