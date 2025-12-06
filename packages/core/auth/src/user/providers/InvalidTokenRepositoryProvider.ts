import type { Awaitable } from '@core/shared'

export interface InvalidTokenRepositoryProvider {
    create(token: string): Awaitable<void>
    exists(token: string): Awaitable<boolean>
}
