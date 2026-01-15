import { loadEnv } from '@standard-schema/load-env'
import { z } from 'zod'

import { DEFAULT_STORE_PATH } from './consts'

export const env = loadEnv({
    // - - - Fastify - - -
    SERVER_HOST: z.string().nonempty(),
    SERVER_PORT: z.coerce.number().int().min(1).max(65535),
    SERVER_LOGGER: z.enum(['true', 'false']).transform((v) => v === 'true'),
    CORS_ORIGIN: z
        .string()
        .transform((val) => (val.length === 0 ? [] : val.split(','))),

    // - - - Sqlite - - -
    STORE_PATH: z
        .string()
        .transform((val) => (val.length === 0 ? DEFAULT_STORE_PATH : val)),

    // - - Paseto - -
    TOKEN_ISSUER: z.string().nonempty(),
    TOKEN_AUDIENCE: z.string().nonempty(),
    TOKEN_EXPIRATION: z.string().nonempty(),

    TOKEN_PRIVATE_KEY: z.string().nonempty(),
    TOKEN_PUBLIC_KEY: z.string().nonempty(),

    // - - - Cookie Sign - - -
    COOKIE_KEY: z.string().trim().min(30),

    // - - - Auth - - -
    ADMIN_KEY: z.string().trim().min(30)
})
