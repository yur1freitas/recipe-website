import { join } from 'node:path'

export const WORKSPACE_PATH = process.cwd()

export const STATIC_FILES_PATH = join(WORKSPACE_PATH, '/public/')

export const DEFAULT_STORE_PATH = join(WORKSPACE_PATH, '.data/')
export const DATABASE_FILENAME = 'db.sqlite'

export const DEFAULT_CAPTCHA_CONFIG = {
    count: 80,
    saltSize: 32,
    difficulty: 4
} as const

export const enum PageRoutes {
    LOGIN = '/public/',
    MANAGER = '/public/manager'
}

export const enum PageFilePaths {
    LOGIN = '/pages/login/index.html',
    MANAGER = '/pages/manager/index.html'
}
