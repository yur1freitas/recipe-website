import { defineConfig } from 'drizzle-kit'
import { config } from '@dotenvx/dotenvx'

config({ path: '.env.dev' })

export default defineConfig({
    casing: 'snake_case',
    dialect: 'postgresql',
    out: './drizzle',
    schema: './src/db/schemas/*.ts',
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})
