import { sign, verify } from 'paseto-ts/v4'

import type { AccessTokenProvider, UserPayload } from '@core/auth'

import { env } from '~/env'

export class PasetoAdapter implements AccessTokenProvider {
    create(payload: UserPayload): string {
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

    decode(token: string): UserPayload {
        const { payload } = verify<UserPayload>(env.TOKEN_PUBLIC_KEY, token, {
            validatePayload: true,
            assertion: {
                iss: env.TOKEN_ISSUER,
                aud: env.TOKEN_AUDIENCE,
                exp: env.TOKEN_EXPIRATION
            }
        })

        return {
            id: payload.id,
            name: payload.name,
            email: payload.email
        }
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
