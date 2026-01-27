import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { UserRepositoryProviderMock } from '~mocks/UserRepositoryProviderMock'
import { randUser } from '~mocks/randUser'
import { EncryptProviderMock } from '~mocks/EncryptProviderMock'
import { AccessTokenProviderMock } from '~mocks/AccessTokenProviderMock'

import { randEmail, randPassword } from '@core/shared/mocks'

import type { LoginUserInput } from '~/user/usecases/LoginUser'
import type { UserRepositoryProvider } from '~/user/providers/UserRepositoryProvider'
import type { UserPayload } from '~/user/models/UserPayload'
import type { UserProps } from '~/user/models/User'

import { LoginUser } from '~/user/usecases/LoginUser'

describe('LoginUser', () => {
    const encryptProvider = new EncryptProviderMock()
    const accessTokenProvider = new AccessTokenProviderMock()

    let user: Required<UserProps>
    let originalPassword: string

    let userRepositoryProvider: UserRepositoryProvider

    afterEach(() => {
        faker.seed()
    })

    beforeEach(async () => {
        originalPassword = randPassword()
        user = randUser({ password: encryptProvider.encrypt(originalPassword) })

        userRepositoryProvider = new UserRepositoryProviderMock([
            [user.id, user]
        ])
    })

    it('deve logar um usuário', async () => {
        const loginUser = new LoginUser(
            userRepositoryProvider,
            encryptProvider,
            accessTokenProvider
        )

        const input: LoginUserInput = {
            email: user.email,
            password: originalPassword
        }

        const payload: UserPayload = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        const token = accessTokenProvider.create(payload)

        await expect(loginUser.execute(input)).resolves.toStrictEqual({
            payload,
            token
        })
    })

    it('deve lançar um erro se o email não estiver cadastrado', async () => {
        const loginUser = new LoginUser(
            userRepositoryProvider,
            encryptProvider,
            accessTokenProvider
        )

        const input: LoginUserInput = {
            email: randEmail(),
            password: originalPassword
        }

        await expect(loginUser.execute(input)).rejects.toThrowError(
            'O email fornecido não está cadastrado'
        )
    })

    it('deve lançar um erro se o email ou senha estiverem errados', async () => {
        const loginUser = new LoginUser(
            userRepositoryProvider,
            encryptProvider,
            accessTokenProvider
        )

        const input: LoginUserInput = {
            email: user.email,
            password: randPassword()
        }

        await expect(loginUser.execute(input)).rejects.toThrowError(
            'O email ou a senha estão incorretos'
        )
    })
})
