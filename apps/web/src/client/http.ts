import createClient from 'openapi-fetch'

import { API_URL } from '~/env'
import type { paths } from './schema'

export const httpClient = createClient<paths>({ baseUrl: API_URL })
