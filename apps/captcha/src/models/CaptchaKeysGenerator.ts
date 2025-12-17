import { randomBytes } from 'node:crypto'

export class CaptchaKeysGenerator {
    createSiteKey(): string {
        return randomBytes(5).toString('hex')
    }

    createSecretKey(): string {
        return randomBytes(40)
            .toString('base64')
            .replace(/\+/g, '')
            .replace(/\//g, '')
            .replace(/=+$/, '')
    }
}
