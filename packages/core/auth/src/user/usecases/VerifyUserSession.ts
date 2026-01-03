import type { UseCase } from '@core/shared'

import type { UserPayload } from '../models/UserPayload'
import type { AccessTokenProvider } from '../providers/AccessTokenProvider'
import type { UserRepositoryProvider } from '../providers/UserRepositoryProvider'

import { AuthError } from '~/shared/errors/AuthError'

export interface VerifyUserSessionInput {
    token: string
}

export interface VerifyUserSessionOutput {
    token: string
    payload: UserPayload
}

export enum VerifyUserSessionErrors {
    InvalidAccessToken = 'INVALID_ACCESS_TOKEN',
    UserNotFound = 'USER_NOT_FOUND'
}

export class VerifyUserSession implements UseCase<
    VerifyUserSessionInput,
    VerifyUserSessionOutput
> {
    constructor(
        private readonly userRepositoryProvider: UserRepositoryProvider,
        private readonly accessTokenProvider: AccessTokenProvider
    ) {}

    async execute(
        input: VerifyUserSessionInput
    ): Promise<VerifyUserSessionOutput> {
        const { token } = input

        const isValid = await this.accessTokenProvider.verify(token)
        const isInvalid = !isValid

        if (isInvalid) {
            throw new AuthError({
                code: VerifyUserSessionErrors.InvalidAccessToken,
                message: 'O token de acesso expirado ou inválido'
            })
        }

        const payload = await this.accessTokenProvider.decode(token)
        const user = await this.userRepositoryProvider.findByEmail(
            payload.email
        )

        if (!user) {
            throw new AuthError({
                code: VerifyUserSessionErrors.UserNotFound,
                message:
                    'O token acesso não corresponde a um usuário cadastrado'
            })
        }

        return { payload, token }
    }
}
