import { randPassword } from './randPassword'

export function randEncryptedPassword(): string {
    return Buffer.from(randPassword()).toString('base64')
}
