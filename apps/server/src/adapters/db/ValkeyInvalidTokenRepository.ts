import type Valkey from 'iovalkey'

import type { InvalidTokenRepositoryProvider } from '@core/auth'

export class ValkeyInvalidTokenRepository implements InvalidTokenRepositoryProvider {
    constructor(private $valkey: Valkey) {}

    async create(token: string): Promise<void> {
        await this.$valkey.setex(token, 3600, 'blacklisted')
    }

    async exists(token: string): Promise<boolean> {
        const response = await this.$valkey.exists(token)

        return response === 1
    }
}
