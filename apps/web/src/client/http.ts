import createClient from 'openapi-fetch'

import type { paths } from './schema'

export const httpClient = createClient<paths>({ baseUrl: process.env.API_URL })
