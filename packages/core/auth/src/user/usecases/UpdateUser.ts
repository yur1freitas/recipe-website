import { Email, Password, Username, type UseCase } from '@core/shared'

import { AuthError } from '~/shared/errors/AuthError'

import type { UserRepositoryProvider } from '../providers/UserRepositoryProvider'
import type { EncryptProvider } from '../providers/EncryptProvider'
import type { UserInput } from '../models/User'

export interface UpdateUserInput {
    id: string
    name?: string
    email?: string
    password?: string
}

export type UpdateUserOutput = void

export enum UpdateUserErrors {
    UserNotFound = 'USER_NOT_FOUND',
    FailedUpdateUser = 'FAILED_UPDATE_USER',
    NoFieldsToUpdate = 'NO_FIELDS_TO_UPDATE'
}

export class UpdateUser implements UseCase<UpdateUserInput, UpdateUserOutput> {
    constructor(
        private readonly userRepositoryProvider: UserRepositoryProvider,
        private readonly encryptionProvider: EncryptProvider
    ) {}

    async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
        const user = await this.userRepositoryProvider.findById(input.id)

        if (!user) {
            throw new AuthError({
                code: UpdateUserErrors.UserNotFound,
                message: 'Nenhum usuário foi encontrado com o ID fornecido'
            })
        }

        const props: Partial<UserInput> = {}

        if (input.name) {
            const name = new Username(input.name)
            props.name = name.value
        }

        if (input.email) {
            const email = new Email(input.email)
            props.email = email.value
        }

        if (input.password) {
            const password = new Password(input.password)
            props.password = await this.encryptionProvider.encrypt(
                password.value
            )
        }

        if (Object.keys(props).length === 0) {
            throw new AuthError({
                code: UpdateUserErrors.NoFieldsToUpdate,
                message: 'Nenhum campo para atualizar foi fornecido'
            })
        }

        const updatedUser = user.clone(props)

        const isSuccess = await this.userRepositoryProvider.update(updatedUser)
        const isFailed = !isSuccess

        if (isFailed) {
            throw new AuthError({
                code: UpdateUserErrors.FailedUpdateUser,
                message: 'Não foi possível atualizar o usuário'
            })
        }
    }
}
