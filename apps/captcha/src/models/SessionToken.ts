import { sign, verify } from 'paseto-ts/v4'

import { env } from '~/env'

export class SessionToken {
    create(payload?: object): string {
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

    decode<T extends Record<string, unknown>>(accessToken: string): T | null {
        try {
            const { payload } = verify<T>(
                env.TOKEN_PUBLIC_KEY,
                accessToken,
                {
                    validatePayload: true,
                    assertion: {
                        iss: env.TOKEN_ISSUER,
                        aud: env.TOKEN_AUDIENCE,
                        exp: env.TOKEN_EXPIRATION
                    }
                }
            )

            return payload
        } catch (err) {
            console.error(err)
            return null
        }
    }

    verify(accessToken: string): boolean {
        try {
            verify(
                env.TOKEN_PUBLIC_KEY,
                accessToken,
                {
                    validatePayload: true,
                    assertion: {
                        iss: env.TOKEN_ISSUER,
                        aud: env.TOKEN_AUDIENCE,
                        exp: env.TOKEN_EXPIRATION
                    }
                }
            )

            return true
        } catch {
            return false
        }
    }
}
