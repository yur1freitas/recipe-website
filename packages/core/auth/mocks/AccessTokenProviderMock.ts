import type {
    AccessTokenProvider,
    AccessTokenPayload
} from '~/user/providers/AccessTokenProvider'

export class AccessTokenProviderMock implements AccessTokenProvider {
    create(payload: AccessTokenPayload): string {
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

    decode(token: string): AccessTokenPayload {
        return JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    }
}
