import type { UseCase } from '@core/shared'

import { AuthError } from '~/shared/errors/AuthError'

import type { UserRepositoryProvider } from '../providers/UserRepositoryProvider'

export interface DeleteUserInput {
    id: string
}

export type DeleteUserOutput = void

export enum DeleteUserErrors {
    UserDoesNotExist = 'USER_DOES_NOT_EXIST'
}

export class DeleteUser implements UseCase<DeleteUserInput, DeleteUserOutput> {
    constructor(
        private readonly userRepositoryProvider: UserRepositoryProvider
    ) {}

    async execute(input: DeleteUserInput): Promise<DeleteUserOutput> {
        const { id } = input

        const userExists = await this.userRepositoryProvider.existsById(id)

        if (!userExists) {
            throw new AuthError({
                code: DeleteUserErrors.UserDoesNotExist,
                message: 'O usuário não existe por isso não pode ser deletado'
            })
        }

        await this.userRepositoryProvider.delete(id)
    }
}
