import { check, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import { recipesTable } from './recipes'

export const stepsTable = pgTable(
    'steps',
    {
        pk: integer('pk')
            .primaryKey()
            .generatedAlwaysAsIdentity({ minValue: 1 }),
        id: uuid().unique().notNull(),
        recipeId: uuid()
            .notNull()
            .references(() => recipesTable.id),
        order: integer().notNull(),
        description: varchar({ length: 120 }).notNull()
    },
    (table) => [
        check('order_min_value_check', sql`${table.order} > 0`),
        check('description_length_check', sql`LENGTH(${table.description}) > 0`)
    ]
)
