import type { ColumnDefinitions } from 'node-pg-migrate'

import type { MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable(
        'ingredients',
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
            unit: {
                type: 'VARCHAR(5)',
                notNull: true
            },
            measure: {
                type: 'VARCHAR(120)',
                notNull: true
            }
        },
        { ifNotExists: true }
    )
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('ingredients', { ifExists: true })
    pgm.dropType('unit', { ifExists: true })
}
