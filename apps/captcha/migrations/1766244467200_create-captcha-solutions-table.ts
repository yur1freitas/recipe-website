import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('captcha_solutions').ifNotExists()
        .addColumn(
            'id',
            'integer',
            col => col.primaryKey().autoIncrement().notNull()
        )
        .addColumn(
            'site_key',
            'text',
            col => col.notNull().references('captcha_keys.site_key')
        )
        .addColumn(
            'count',
            'integer',
            col => col.notNull()
        )
        .addColumn(
            'bucket',
            'integer',
            col => col.notNull()
        )
        .addUniqueConstraint('bucketing', ['site_key', 'bucket'])
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema
        .dropTable('captcha_solutions').ifExists()
        .execute()
}
