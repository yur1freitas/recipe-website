import '@fastify/cookie'
import type { Assertion } from 'paseto-ts/lib/types'

import { decrypt, verify } from 'paseto-ts/v4'

import type { FastifyRequest } from 'fastify'

import type { FailedOutput, Output } from './types'

import { createFailedOutput, createSuccessOutput } from './utils'

export const DEFAULT_FAILED_OUTPUT: Readonly<FailedOutput> = {
    valid: false,
    token: null,
    payload: null,
    error: null
}

export type CustomValidationLogicFn = (
    token: string,
    payload: object
) => Promise<boolean> | boolean

export interface CreatePasetoAuthInput {
    paseto: {
        mode: 'public' | 'local'
        key: string
        decodeOptions?: {
            assertion?: Assertion | string | Uint8Array
            maxDepth?: number
            maxKeys?: number
            validatePayload?: boolean
        }
    }
    cookieName: string
    isSignedCookie?: boolean
    customValidationLogic?: CustomValidationLogicFn
}

export type CreatePasetoAuthOutput = (
    request: FastifyRequest
) => Promise<Output>

export function createPasetoAuth({
    paseto,
    cookieName,
    isSignedCookie,
    customValidationLogic
}: CreatePasetoAuthInput): CreatePasetoAuthOutput {
    return async (request: FastifyRequest): Promise<Output> => {
        try {
            const token = request.cookies?.[cookieName]

            if (!token) {
                return DEFAULT_FAILED_OUTPUT
            }

            if (isSignedCookie) {
                const unsigned = request.unsignCookie(token)

                if (!unsigned.valid) {
                    return DEFAULT_FAILED_OUTPUT
                }

                const { payload } =
                    paseto.mode === 'public'
                        ? verify(
                              paseto.key,
                              unsigned.value,
                              paseto.decodeOptions
                          )
                        : decrypt(
                              paseto.key,
                              unsigned.value,
                              paseto.decodeOptions
                          )

                if (customValidationLogic) {
                    const isValid = await customValidationLogic(
                        unsigned.value,
                        payload
                    )

                    if (!isValid) {
                        return DEFAULT_FAILED_OUTPUT
                    }
                }

                return createSuccessOutput(unsigned.value, payload)
            }

            const { payload } =
                paseto.mode === 'public'
                    ? verify(paseto.key, token, paseto.decodeOptions)
                    : decrypt(paseto.key, token, paseto.decodeOptions)

            if (customValidationLogic) {
                const isValid = await customValidationLogic(token, payload)

                if (!isValid) {
                    return DEFAULT_FAILED_OUTPUT
                }
            }

            return createSuccessOutput(token, payload)
        } catch (err) {
            request.server.log.error(err)

            if (Error.isError(err)) {
                return createFailedOutput(err)
            }

            return DEFAULT_FAILED_OUTPUT
        }
    }
}
