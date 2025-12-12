import { createQueryHook } from 'swr-openapi'

import { httpClient } from './http'

const prefix = 'api'

export const useQuery = createQueryHook(httpClient, prefix)
