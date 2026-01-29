import type { HttpError } from '@fastify/sensible'

import type { Output } from './types'

import { createFailedOutput } from './utils'
import { DEFAULT_SUCCESS_OUTPUT } from './consts'

export interface SiteVerifyInput {
    endpoint: string
    token: string
    apiKey: string
    secretKey: string
}

export async function siteVerify({
    endpoint,
    token,
    apiKey,
    secretKey
}: SiteVerifyInput): Promise<Output> {
    const url = new URL('siteverify', endpoint)

    const body = JSON.stringify({ secretKey, token }, null, 0)

    const response = await fetch(url, {
        body,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })

    if (response.ok) {
        return DEFAULT_SUCCESS_OUTPUT
    }

    const error = (await response.json()) as HttpError

    return createFailedOutput(error)
}
