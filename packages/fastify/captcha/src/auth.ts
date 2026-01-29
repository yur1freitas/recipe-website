import { isPlainObject } from '@utils/core/isPlainObject'
import { hasProperty } from '@utils/core/hasProperty'

import type { FastifyRequest } from 'fastify'

import type { Output } from './types'

import { createFailedOutput } from './utils'
import { siteVerify } from './siteverify'
import { DEFAULT_FAILED_OUTPUT } from './consts'

export interface CreateCaptchaAuthInput {
    /**
     * Nome da propriedade do body que contêm o token do captcha
     */
    bodyProperty: string
    endpoint: string
    apiKey: string
    secretKey: string
}

export type CreateCaptchaAuthOutput = (
    request: FastifyRequest
) => Promise<Output>

export function createCaptchaAuth({
    endpoint,
    apiKey,
    secretKey,
    bodyProperty
}: CreateCaptchaAuthInput): CreateCaptchaAuthOutput {
    return async (request: FastifyRequest): Promise<Output> => {
        try {
            if (
                !isPlainObject(request.body) ||
                !hasProperty(request.body, bodyProperty)
            ) {
                return DEFAULT_FAILED_OUTPUT
            }

            const token = request.body[bodyProperty]
            delete request.body[bodyProperty]

            if (!token) {
                return DEFAULT_FAILED_OUTPUT
            }

            const output = await siteVerify({
                endpoint,
                apiKey,
                secretKey,
                token
            })

            return output
        } catch (err) {
            request.server.log.error(err)

            if (Error.isError(err)) {
                return createFailedOutput(err)
            }

            return DEFAULT_FAILED_OUTPUT
        }
    }
}
