import type { ColumnDefinitions } from 'node-pg-migrate'

import type { MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(
        'steps',
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
            recipe_id: {
                type: 'UUID',
                unique: true,
                notNull: true,
                references: 'recipes(id)'
            },
            order: {
                type: 'INT',
                notNull: true,
                check: '"order" > 0'
            },
            description: {
                type: 'VARCHAR(256)',
                notNull: true
            }
        },
        { ifNotExists: true }
    )
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('steps', { ifExists: true })
}
