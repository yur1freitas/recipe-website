import { join } from 'node:path'
import { defineConfig } from 'kysely-ctl'
import Sqlite from 'better-sqlite3'

import { env } from './src/env'
import { DATABASE_FILENAME } from './src/consts'

const filePath = join(env.STORE_PATH, DATABASE_FILENAME)
const database = new Sqlite(filePath)

export default defineConfig({
    dialect: 'better-sqlite3',
    dialectConfig: {
        database
    },
    migrations: {
        migrationFolder: 'migrations/'
    }
})
