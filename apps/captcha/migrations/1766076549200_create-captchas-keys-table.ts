import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('captcha_keys').ifNotExists()
        .addColumn(
            'id',
            'integer',
            col => col.primaryKey().autoIncrement().notNull()
        )
        .addColumn(
            'name',
            'varchar(120)',
            col => col.notNull()
        )
        .addColumn(
            'site_key',
            'text',
            col => col.unique().notNull()
        )
        .addColumn(
            'secret_key',
            'text',
            col => col.unique().notNull()
        )
        .addColumn(
            'created_at',
            'integer',
            col => col.notNull()
        )
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .dropTable('captchas_keys').ifExists()
        .execute()
}
