import {
    check,
    integer,
    pgTable,
    text,
    uuid,
    varchar
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const usersTable = pgTable(
    'users',
    {
        pk: integer('pk')
            .primaryKey()
            .generatedAlwaysAsIdentity({ minValue: 1 }),
        id: uuid().unique().notNull(),
        name: varchar({ length: 120 }).notNull(),
        email: varchar({ length: 120 }).unique().notNull(),
        password: text().notNull()
    },
    (table) => [
        check('name_length_check', sql`LENGTH(${table.name}) >= 3`),
        check('password_length_check', sql`LENGTH(${table.password}) >= 8`)
    ]
)
