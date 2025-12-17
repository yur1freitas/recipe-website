import { randomBytes } from 'node:crypto'

interface CreateAPIKeyOutput {
    id: string
    token: string
    apiKey: string
}

export class APIKeyGenerator {
    create(): CreateAPIKeyOutput {
        const id = randomBytes(16).toString('hex')
        const token = randomBytes(32)
            .toString('base64')
            .replace(/\+/g, '')
            .replace(/\//g, '')
            .replace(/=+$/, '')

        const apiKey = `${id}_${token}`

        return { id, token, apiKey }
    }
}
