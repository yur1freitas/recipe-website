import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { UserRepositoryProviderMock } from '~mocks/UserRepositoryProviderMock'
import { AccessTokenProviderMock } from '~mocks/AccessTokenProviderMock'
import { randUser } from '~mocks/randUser'

import { randEncryptedPassword } from '@core/shared/mocks'

import type { VerifyUserSessionInput } from '~/user/usecases/VerifyUserSession'
import type { UserPayload } from '~/user/models/UserPayload'

import { VerifyUserSession } from '~/user/usecases/VerifyUserSession'

describe('VerifyUserSession', () => {
    const accessTokenProvider = new AccessTokenProviderMock()

    let token: string
    let payload: UserPayload
    let userRepositoryProvider: UserRepositoryProviderMock

    afterEach(() => {
        faker.seed()
    })

    beforeEach(async () => {
        const user = randUser({ password: randEncryptedPassword() })

        payload = { id: user.id, name: user.name, email: user.email }
        token = accessTokenProvider.create(payload)

        userRepositoryProvider = new UserRepositoryProviderMock([
            [user.id, user]
        ])
    })

    it('deve verificar a sessão de um usuário', async () => {
        const verifyUserSession = new VerifyUserSession(
            userRepositoryProvider,
            accessTokenProvider
        )

        const input: VerifyUserSessionInput = { token }

        await expect(verifyUserSession.execute(input)).resolves.toStrictEqual({
            token,
            payload
        })
    })

    it('deve lançar um erro se o token estiver inválido ou expirado', async () => {
        const verifyUserSession = new VerifyUserSession(
            userRepositoryProvider,
            accessTokenProvider
        )

        const input: VerifyUserSessionInput = {
            token: faker.string.alphanumeric()
        }

        await expect(verifyUserSession.execute(input)).rejects.toThrowError(
            'O token de acesso expirado ou inválido'
        )
    })

    it('deve lançar um erro se o token não corresponder à um usuário cadastrado', async () => {
        const verifyUserSession = new VerifyUserSession(
            userRepositoryProvider,
            accessTokenProvider
        )

        const { id, name, email } = randUser()

        const payload = { id, name, email }
        const token = accessTokenProvider.create(payload)

        const input: VerifyUserSessionInput = { token }

        await expect(verifyUserSession.execute(input)).rejects.toThrowError(
            'O token acesso não corresponde a um usuário cadastrado'
        )
    })
})
