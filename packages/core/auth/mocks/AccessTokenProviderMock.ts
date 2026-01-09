import type { AccessTokenProvider } from '~/user/providers/AccessTokenProvider'
import type { UserPayload } from '~/user/models/UserPayload'

export class AccessTokenProviderMock implements AccessTokenProvider {
    create(payload: UserPayload): string {
        return Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64')
    }

    verify(token: string): boolean {
        try {
            this.decode(token)
            return true
        } catch {
            return false
        }
    }

    decode(token: string): UserPayload {
        return JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    }
}
