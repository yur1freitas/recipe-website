import type { EncryptProvider } from '~/user/providers/EncryptProvider'

export class EncryptProviderMock implements EncryptProvider {
    encrypt(input: string): string {
        return Buffer.from(input).toString('base64')
    }

    compare(hash: string, input: string): boolean {
        return this.encrypt(input) === hash
    }
}
