import { existsSync, mkdirSync } from 'node:fs'

export function ensureDirSync(path: string): void {
    if (existsSync(path)) {
        return
    }

    mkdirSync(path, { recursive: true })
}
