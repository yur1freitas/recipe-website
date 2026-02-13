import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { UserRepositoryProviderMock } from '~mocks/UserRepositoryProviderMock'
import { randUser } from '~mocks/randUser'

import { randId } from '@core/shared/mocks'

import type { UserRepositoryProvider } from '~/user/providers/UserRepositoryProvider'

import { DeleteUser } from '~/user/usecases/DeleteUser'

describe('DeleteUser', () => {
    let userRepositoryProvider: UserRepositoryProvider
    let id: string

    afterEach(() => {
        faker.seed()
    })

    beforeEach(async () => {
        id = randId()

        const user = randUser({ id })

        userRepositoryProvider = new UserRepositoryProviderMock([
            [user.id, user]
        ])
    })

    it('deve deletar um usuário', async () => {
        const deleteUser = new DeleteUser(userRepositoryProvider)

        await expect(deleteUser.execute({ id })).resolves.toBeUndefined()
    })

    it('deve lançar um erro se o usuário não existir', async () => {
        const deleteUser = new DeleteUser(userRepositoryProvider)
        const id = randId()

        await expect(deleteUser.execute({ id })).rejects.toThrowError(
            'O usuário não existe por isso não pode ser deletado'
        )
    })
})
