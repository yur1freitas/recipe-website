import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('captcha_configs')
        .ifNotExists()
        .addColumn('id', 'integer', (col) =>
            col.primaryKey().autoIncrement().notNull()
        )
        .addColumn('site_key', 'text', (col) =>
            col.unique().notNull().references('captcha_keys.site_key')
        )
        .addColumn('count', 'integer', (col) => col.notNull())
        .addColumn('salt_size', 'integer', (col) => col.notNull())
        .addColumn('difficulty', 'integer', (col) => col.notNull())
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('captcha_configs').ifExists().execute()
}
