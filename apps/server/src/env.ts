import { z } from 'zod'

import { loadEnv } from './utils/env'

export const env = loadEnv({
    // - - API - -
    API_PORT: z.coerce.number().min(0).max(65535),
    API_LOGGER: z.enum(['true', 'false']).transform((v) => v === 'true'),

    // - - Web (NextJS) - -
    WEB_URL: z.url({ protocol: /^http(s)?$/ }),

    // - - Database (PostgreSQL) - -
    DB_HOST: z.hostname(),
    DB_PORT: z.coerce.number().min(0).max(65535),
    DB_USER: z.string().trim().nonempty(),
    DB_NAME: z.string().trim().nonempty(),
    DB_PASSWORD: z.string().trim().nonempty(),

    // - - Memory Database (Valkey) - -
    VALKEY_HOST: z.hostname(),
    VALKEY_PORT: z.coerce.number().min(0).max(65535),

    // - - Access Token (Paseto) - -
    TOKEN_ISSUER: z.string().trim().nonempty(),
    TOKEN_AUDIENCE: z.string().trim().nonempty(),
    TOKEN_EXPIRATION: z.string().trim().nonempty(),
    TOKEN_PRIVATE_KEY: z.string().trim().nonempty(),
    TOKEN_PUBLIC_KEY: z.string().trim().nonempty()
})
