import type { ColumnDefinitions } from 'node-pg-migrate'

import type { MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
    const { rowCount } = await pgm.db.query(
        'SELECT 1 FROM pg_type WHERE typname = $1',
        ['difficulty']
    )

    if (rowCount === 0) {
        pgm.createType('difficulty', ['ENUM("easy", "medium", "hard")'])
    }

    pgm.createTable(
        'recipes',
        {
            pk: {
                type: 'SERIAL',
                primaryKey: true,
                notNull: true,
                check: 'pk >= 0'
            },
            id: {
                type: 'UUID',
                unique: true,
                notNull: true
            },
            author_id: {
                type: 'UUID',
                unique: true,
                notNull: true,
                references: 'users(id)'
            },
            name: {
                type: 'VARCHAR(64)',
                notNull: true,
                check: 'LENGTH(name) >= 3'
            },
            description: {
                type: 'VARCHAR(256)',
                notNull: true
            },
            difficulty: {
                type: 'difficulty',
                notNull: true
            }
        },
        { ifNotExists: true }
    )
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('recipes', { ifExists: true })
    pgm.dropType('difficulty', { ifExists: true })
}
