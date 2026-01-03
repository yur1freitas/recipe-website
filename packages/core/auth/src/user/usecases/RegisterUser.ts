import type { UseCase } from '@core/shared'

import { Email, Password, Username } from '@core/shared'

import type { EncryptProvider } from '../providers/EncryptProvider'
import type { UserRepositoryProvider } from '../providers/UserRepositoryProvider'

import { AuthError } from '~/shared/errors/AuthError'
import { User } from '../models/User'

export interface RegisterUserInput {
    name: string
    email: string
    password: string
}

export type RegisterUserOutput = void

export enum RegisterUserErrors {
    UserAlreadyExists = 'USER_ALREADY_EXISTS',
    FailedRegisterUser = 'FAILED_REGISTER_USER'
}

export class RegisterUser implements UseCase<
    RegisterUserInput,
    RegisterUserOutput
> {
    constructor(
        private readonly userRepositoryProvider: UserRepositoryProvider,
        private readonly encryptionProvider: EncryptProvider
    ) {}

    async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
        const name = new Username(input.name)
        const email = new Email(input.email)
        const password = new Password(input.password)

        const isUserExists = await this.userRepositoryProvider.existsByEmail(
            email.value
        )

        if (isUserExists) {
            throw new AuthError({
                code: RegisterUserErrors.UserAlreadyExists,
                message: 'O email fornecido já está sendo usado'
            })
        }

        const encryptedPassword = await this.encryptionProvider.encrypt(
            password.value
        )

        const user = new User({
            name: name.value,
            email: email.value,
            password: encryptedPassword
        })

        const isSuccess = await this.userRepositoryProvider.create(user)
        const isFailed = !isSuccess

        if (isFailed) {
            throw new AuthError({
                code: RegisterUserErrors.FailedRegisterUser,
                message: 'Não foi possível cadastrá-lo'
            })
        }
    }
}
