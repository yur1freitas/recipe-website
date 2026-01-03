import createClient from 'openapi-fetch'

import type { paths } from './schema'
import { API_URL } from '~/env'

export const httpClient = createClient<paths>({ baseUrl: API_URL })
