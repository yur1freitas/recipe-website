import type { ColumnDefinitions } from 'node-pg-migrate'

import { MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('users', {
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
        name: {
            type: 'VARCHAR(120)',
            notNull: true,
            check: 'LENGTH(name) >= 3'
        },
        email: {
            type: 'VARCHAR(120)',
            unique: true,
            notNull: true
        },
        password: {
            type: 'TEXT',
            notNull: true
        }
    }, { ifNotExists: true })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('users', { ifExists: true })
}
