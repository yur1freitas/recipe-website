import type { UseCase } from '@core/shared'

import { AuthError } from '~/shared/errors/AuthError'
import type { AccessTokenProvider } from '../providers/AccessTokenProvider'
import type { InvalidTokenRepositoryProvider } from '../providers/InvalidTokenRepositoryProvider'

export interface LogoutUserInput {
    token: string
}

export type LogoutUserOutput = void

export enum LogoutUserErrors {
    InvalidAccessToken = 'INVALID_ACCESS_TOKEN',
    AccessTokenAlreadyInvalid = 'ACCESS_TOKEN_ALREADY_INVALID'
}

export class LogoutUser implements UseCase<LogoutUserInput, LogoutUserOutput> {
    constructor(
        private readonly accessTokenProvider: AccessTokenProvider,
        private readonly invalidTokenRepositoryProvider: InvalidTokenRepositoryProvider
    ) {}

    async execute(input: LogoutUserInput): Promise<LogoutUserOutput> {
        const { token } = input

        const isValid = await this.accessTokenProvider.verify(token)
        const isInvalid = !isValid

        if (isInvalid) {
            throw new AuthError({
                code: LogoutUserErrors.InvalidAccessToken,
                message: 'O token de acesso expirado ou inválido'
            })
        }

        const isExists = await this.invalidTokenRepositoryProvider.exists(token)

        if (isExists) {
            throw new AuthError({
                code: LogoutUserErrors.AccessTokenAlreadyInvalid,
                message: 'O token de acesso está invalidado'
            })
        }

        await this.invalidTokenRepositoryProvider.create(token)
    }
}
