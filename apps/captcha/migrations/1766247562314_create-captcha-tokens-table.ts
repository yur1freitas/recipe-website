import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('captcha_tokens')
        .ifNotExists()
        .addColumn('id', 'integer', (col) =>
            col.primaryKey().autoIncrement().notNull()
        )
        .addColumn('site_key', 'text', (col) =>
            col.notNull().references('captcha_keys.site_key')
        )
        .addColumn('token', 'text', (col) => col.notNull())
        .addColumn('created_at', 'integer', (col) => col.notNull())
        .addColumn('expires_at', 'integer', (col) => col.notNull())
        .addUniqueConstraint('site_key_token_unique', ['site_key', 'token'])
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('captcha_tokens').ifExists().execute()
}
