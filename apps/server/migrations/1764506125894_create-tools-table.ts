import type { ColumnDefinitions } from 'node-pg-migrate'

import type { MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(
        'tools',
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
            name: {
                type: 'VARCHAR(64)',
                notNull: true,
                check: 'LENGTH(name) >= 3'
            },
            amount: {
                type: 'INT',
                notNull: true,
                check: 'amount > 0'
            }
        },
        { ifNotExists: true }
    )
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('tools', { ifExists: true })
}
