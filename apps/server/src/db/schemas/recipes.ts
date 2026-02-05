import {
    check,
    integer,
    pgTable,
    uuid,
    varchar,
    index
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import { DifficultyEnum } from '@core/cooking'

import { usersTable } from './users'

export const recipesTable = pgTable(
    'recipes',
    {
        pk: integer('pk')
            .primaryKey()
            .generatedAlwaysAsIdentity({ minValue: 1 }),
        id: uuid().unique().notNull(),
        authorId: uuid()
            .notNull()
            .references(() => usersTable.id),
        name: varchar({ length: 64 }).notNull(),
        description: varchar({ length: 256 }).notNull(),
        difficulty: varchar({
            enum: [
                DifficultyEnum.EASY,
                DifficultyEnum.MEDIUM,
                DifficultyEnum.HARD
            ]
        }).notNull(),
        preparationTime: integer().notNull()
    },
    (table) => [
        check('name_length_check', sql`LENGTH(${table.name}) >= 3`),
        check(
            'description_length_check',
            sql`LENGTH(${table.description}) > 0`
        ),
        check(
            'preparation_time_min_value_check',
            sql`${table.preparationTime} > 0`
        ),
        index('name_search_index').using(
            'gin',
            sql`to_tsvector('portuguese', ${table.name})`
        )
    ]
)
