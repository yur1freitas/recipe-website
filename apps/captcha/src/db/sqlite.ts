import { join } from 'node:path'

import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely'
import Sqlite from 'better-sqlite3'

import { ensureDirSync } from '~/utils/fs'

import { env } from '~/env'
import { DATABASE_FILENAME } from '~/consts'

import type { Database } from './types'

ensureDirSync(env.STORE_PATH)

const filePath = join(env.STORE_PATH, DATABASE_FILENAME)

const database = new Sqlite(filePath)
const dialect = new SqliteDialect({ database })

export const db = new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()]
})
