import type { UseCase } from '@core/shared'

import { Email } from '@core/shared'

import type { UserRepositoryProvider } from '../providers/UserRepositoryProvider'
import type { EncryptProvider } from '../providers/EncryptProvider'
import type { AccessTokenProvider } from '../providers/AccessTokenProvider'
import type { UserPayload } from '../models/UserPayload'

import { AuthError } from '~/shared/errors/AuthError'

export interface LoginUserInput {
    email: string
    password: string
}

export interface LoginUserOutput {
    token: string
    payload: UserPayload
}

export enum LoginUserErrors {
    UserDoesNotExist = 'USER_DOES_NOT_EXIST',
    IncorrectCredentials = 'INCORRECT_CREDENTIALS'
}

export class LoginUser implements UseCase<LoginUserInput, LoginUserOutput> {
    constructor(
        private readonly userRepositoryProvider: UserRepositoryProvider,
        private readonly encryptionProvider: EncryptProvider,
        private readonly accessTokenProvider: AccessTokenProvider
    ) {}

    async execute(input: LoginUserInput): Promise<LoginUserOutput> {
        const email = new Email(input.email)

        const user = await this.userRepositoryProvider.findByEmail(email.value)

        if (!user) {
            throw new AuthError({
                code: LoginUserErrors.UserDoesNotExist,
                message: 'O email fornecido não está cadastrado'
            })
        }

        const isOriginalPassword = await this.encryptionProvider.compare(
            user.password!.value,
            input.password
        )

        const isIncorrectPassword = !isOriginalPassword

        if (isIncorrectPassword) {
            throw new AuthError({
                code: LoginUserErrors.IncorrectCredentials,
                message: 'O email ou a senha estão incorretos'
            })
        }

        const payload: UserPayload = {
            id: user.id.value,
            name: user.name.value,
            email: user.email.value
        }

        const token = await this.accessTokenProvider.create(payload)

        return { payload, token }
    }
}
