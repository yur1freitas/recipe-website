import type { Awaitable } from '@core/shared'

export interface AccessTokenPayload {
    userId: string
}

export interface AccessTokenProvider {
    create(payload: AccessTokenPayload): Awaitable<string>
    verify(token: string): Awaitable<boolean>
    decode(token: string): Awaitable<AccessTokenPayload>
}
