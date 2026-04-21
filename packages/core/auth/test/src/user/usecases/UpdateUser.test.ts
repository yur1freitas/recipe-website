import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { UserRepositoryProviderMock } from '~mocks/UserRepositoryProviderMock'
import { randUser } from '~mocks/randUser'
import { EncryptProviderMock } from '~mocks/EncryptProviderMock'

import { randId } from '@core/shared/mocks'

import type { UpdateUserInput } from '~/user/usecases/UpdateUser'

import { UpdateUser } from '~/user/usecases/UpdateUser'

describe('UpdateUser', () => {
    const encryptProvider = new EncryptProviderMock()

    let userId: string

    let userRepositoryProvider: UserRepositoryProviderMock

    afterEach(() => {
        faker.seed()
    })

    beforeEach(() => {
        userId = randId()
        const user = randUser({ id: userId })

        userRepositoryProvider = new UserRepositoryProviderMock([
            [user.id, user]
        ])
    })

    it('deve atualizar um usuário', async () => {
        const updateUser = new UpdateUser(
            userRepositoryProvider,
            encryptProvider
        )

        const input: Required<UpdateUserInput> = randUser({ id: userId })

        await expect(updateUser.execute(input)).resolves.toBeNullable()

        const user = userRepositoryProvider.findById(userId)!

        expect(user.name.value).toBe(input.name)
        expect(user.email.value).toBe(input.email)
        expect(encryptProvider.compare(user.password!.value, input.password))
    })

    it('deve lançar um erro se o usuário não existir', async () => {
        const updateUser = new UpdateUser(
            userRepositoryProvider,
            encryptProvider
        )
        const id = randId()

        await expect(updateUser.execute({ id })).rejects.toThrowError(
            'Nenhum usuário foi encontrado com o ID fornecido'
        )
    })

    it('deve lançar um erro se nenhum campo para atualizar for fornecido', async () => {
        const updateUser = new UpdateUser(
            userRepositoryProvider,
            encryptProvider
        )
        const input: UpdateUserInput = { id: userId }

        await expect(updateUser.execute(input)).rejects.toThrowError(
            'Nenhum campo para atualizar foi fornecido'
        )
    })

    it('deve lançar um erro se não for possível atualizar o usuário', async () => {
        const updateUser = new UpdateUser(
            userRepositoryProvider,
            encryptProvider
        )

        const input: UpdateUserInput = randUser({ id: userId })

        const mock = vi
            .spyOn(userRepositoryProvider, 'update')
            .mockReturnValue(false)

        await expect(updateUser.execute(input)).rejects.toThrowError(
            'Não foi possível atualizar o usuário'
        )

        mock.mockReset()
    })
})
