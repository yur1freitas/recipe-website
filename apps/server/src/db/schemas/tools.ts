import { check, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import { recipesTable } from './recipes'

export const toolsTable = pgTable(
    'tools',
    {
        pk: integer('pk')
            .primaryKey()
            .generatedAlwaysAsIdentity({ minValue: 1 }),
        id: uuid().unique().notNull(),
        recipeId: uuid()
            .notNull()
            .references(() => recipesTable.id),
        name: varchar({ length: 64 }).notNull(),
        amount: integer().notNull()
    },
    (table) => [
        check('name_length_check', sql`LENGTH(${table.name}) >= 3`),
        check('amount_min_value_check', sql`${table.amount} > 0`)
    ]
)
