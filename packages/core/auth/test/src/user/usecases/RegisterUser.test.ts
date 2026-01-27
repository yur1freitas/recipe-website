import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { UserRepositoryProviderMock } from '~mocks/UserRepositoryProviderMock'
import { randUser } from '~mocks/randUser'
import { EncryptProviderMock } from '~mocks/EncryptProviderMock'

import type { RegisterUserInput } from '~/user/usecases/RegisterUser'

import { RegisterUser } from '~/user/usecases/RegisterUser'

describe('RegisterUser', () => {
    const encryptProvider = new EncryptProviderMock()

    let userRepositoryProvider: UserRepositoryProviderMock

    afterEach(() => {
        faker.seed()
    })

    beforeEach(() => {
        userRepositoryProvider = new UserRepositoryProviderMock()
    })

    it('deve cadastrar um usuário', async () => {
        const registerUser = new RegisterUser(
            userRepositoryProvider,
            encryptProvider
        )

        const input: RegisterUserInput = randUser()

        await expect(registerUser.execute(input)).resolves.toBeNullable()
    })

    it('deve lançar um erro se o email já estiver cadastrado', async () => {
        const registerUser = new RegisterUser(
            userRepositoryProvider,
            encryptProvider
        )

        const input: RegisterUserInput = randUser()

        await expect(registerUser.execute(input)).resolves.toBeNullable()

        await expect(registerUser.execute(input)).rejects.toThrowError(
            'O email fornecido já está sendo usado'
        )
    })

    it('deve lançar um erro se não for possível cadastrar o usuário', async () => {
        const registerUser = new RegisterUser(
            userRepositoryProvider,
            encryptProvider
        )

        const input: RegisterUserInput = randUser()

        const mock = vi
            .spyOn(userRepositoryProvider, 'create')
            .mockReturnValue(false)

        await expect(registerUser.execute(input)).rejects.toThrowError(
            'Não foi possível cadastrá-lo'
        )

        mock.mockReset()
    })
})
