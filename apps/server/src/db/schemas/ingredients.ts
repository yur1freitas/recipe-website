import { check, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import { UnitEnum } from '@core/cooking'

import { recipesTable } from './recipes'

export const ingredientsTable = pgTable(
    'ingredients',
    {
        pk: integer('pk')
            .primaryKey()
            .generatedAlwaysAsIdentity({ minValue: 1 }),
        id: uuid().unique().notNull(),
        recipeId: uuid()
            .notNull()
            .references(() => recipesTable.id),
        name: varchar({ length: 120 }).notNull(),
        measure: varchar({ length: 120 }).notNull(),
        unit: varchar({
            enum: [
                UnitEnum.CUP,
                UnitEnum.DESSERT_SPOON,
                UnitEnum.DROP,
                UnitEnum.GRAM,
                UnitEnum.KILOGRAM,
                UnitEnum.LITRE,
                UnitEnum.MILLIGRAM,
                UnitEnum.MILLILITRE,
                UnitEnum.PINCH,
                UnitEnum.SALT_SPOON,
                UnitEnum.TABLE_SPOON,
                UnitEnum.TEA_SPON
            ]
        }).notNull()
    },
    (table) => [check('name_length_check', sql`LENGTH(${table.name}) >= 3`)]
)
