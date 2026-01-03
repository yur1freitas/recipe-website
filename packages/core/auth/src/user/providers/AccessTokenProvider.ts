import type { Awaitable } from '@core/shared'

import type { UserPayload } from '../models/UserPayload'

export interface AccessTokenProvider {
    create(payload: UserPayload): Awaitable<string>
    verify(token: string): Awaitable<boolean>
    decode(token: string): Awaitable<UserPayload>
}
