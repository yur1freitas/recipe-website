import { compare } from 'bcrypt'

import type { FastifyRequest } from 'fastify'

import type { UserSessionRepository } from '~/models/UserSessionRepository'
import type { SessionToken } from '~/models/SessionToken'

export interface CreateUserSessionValidatorInput {
    sessionToken: SessionToken
    userSessionRepository: UserSessionRepository
}

export type ValidateUserSessionFn = (
    request: FastifyRequest
) => Promise<
    | { isValid: true; accessToken: string }
    | { isValid: false; accessToken: null }
>

export type CreateUserSessionValidatorOutput = ValidateUserSessionFn

export function createUserSessionValidator({
    sessionToken,
    userSessionRepository
}: CreateUserSessionValidatorInput): CreateUserSessionValidatorOutput {
    return async (request: FastifyRequest) => {
        try {
            const { accessToken } = request.cookies as { accessToken?: string }

            if (!accessToken) {
                return { isValid: false, accessToken: null }
            }

            const unsignedCookie = request.unsignCookie(accessToken)

            if (!unsignedCookie.valid) {
                return { isValid: false, accessToken: null }
            }

            const tokenPayload = sessionToken.decode<{ id: string }>(
                unsignedCookie.value
            )

            if (!tokenPayload) {
                return { isValid: false, accessToken: null }
            }

            const userSession = await userSessionRepository.find({
                id: tokenPayload.id
            })

            if (!userSession) {
                return { isValid: false, accessToken: null }
            }

            const isSameToken = await compare(
                unsignedCookie.value,
                userSession.accessToken
            )

            if (!isSameToken) {
                return { isValid: false, accessToken: null }
            }

            return { isValid: true, accessToken: unsignedCookie.value }
        } catch {
            return { isValid: false, accessToken: null }
        }
    }
}
