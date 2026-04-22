import { sign, verify } from 'paseto-ts/v4'

import type { AccessTokenPayload, AccessTokenProvider } from '@core/auth'

import { env } from '~/env'

export class PasetoAdapter implements AccessTokenProvider {
    create(payload: AccessTokenPayload): string {
        return sign(
            env.TOKEN_PRIVATE_KEY,
            {
                ...payload,
                iss: env.TOKEN_ISSUER,
                aud: env.TOKEN_AUDIENCE,
                exp: env.TOKEN_EXPIRATION
            },
            {
                addExp: true,
                validatePayload: true,
                assertion: {
                    iss: env.TOKEN_ISSUER,
                    aud: env.TOKEN_AUDIENCE,
                    exp: env.TOKEN_EXPIRATION
                }
            }
        )
    }

    decode(token: string): AccessTokenPayload {
        const { payload } = verify<AccessTokenPayload>(
            env.TOKEN_PUBLIC_KEY,
            token,
            {
                validatePayload: true,
                assertion: {
                    iss: env.TOKEN_ISSUER,
                    aud: env.TOKEN_AUDIENCE,
                    exp: env.TOKEN_EXPIRATION
                }
            }
        )

        return { userId: payload.userId }
    }

    verify(token: string): boolean {
        try {
            this.decode(token)
            return true
        } catch {
            return false
        }
    }
}
