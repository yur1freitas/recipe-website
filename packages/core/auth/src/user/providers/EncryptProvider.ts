import type { Awaitable } from '@core/shared'

export interface EncryptProvider {
    encrypt(input: string): Awaitable<string>
    compare(hash: string, input: string): Awaitable<boolean>
}
