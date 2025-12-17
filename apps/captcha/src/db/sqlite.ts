import { join } from 'node:path'

import Sqlite from 'better-sqlite3'
import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'

import { ensureDirSync } from '~/utils/fs'

import { DATABASE_FILENAME } from '~/consts'
import { env } from '~/env'

import type { Database } from './types'

ensureDirSync(env.STORE_PATH)

const filePath = join(env.STORE_PATH, DATABASE_FILENAME)

const database = new Sqlite(filePath)
const dialect = new SqliteDialect({ database })

export const db = new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()]
})
