import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

import type { DB } from './schema'

import { TimePlugin } from './plugins'
import { env } from '../env'

const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD
})

const dialect = new PostgresDialect({ pool })

export const postgres = new Kysely<DB>({
    dialect,
    plugins: [
        new CamelCasePlugin(),
        new TimePlugin({ columns: ['preparationTime'] })
    ]
})
