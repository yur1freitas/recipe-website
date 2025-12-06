import type { EncryptProvider } from '@core/auth'

import bcrypt from 'bcrypt'

export const BCRYPT_ROUNDS = 10

export class BcryptAdapter implements EncryptProvider {
    async encrypt(input: string): Promise<string> {
        return bcrypt.hash(input, BCRYPT_ROUNDS)
    }

    async compare(hash: string, input: string): Promise<boolean> {
        return bcrypt.compare(input, hash)
    }
}
