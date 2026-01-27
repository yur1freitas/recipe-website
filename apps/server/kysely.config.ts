import { Pool } from 'pg'
import { defineConfig } from 'kysely-ctl'

import { env } from './src/env'

const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD
})

export default defineConfig({
    dialect: 'pg',
    dialectConfig: {
        pool
    },
    migrations: {
        migrationFolder: 'migrations/'
    }
})
