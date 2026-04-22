import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { UserRepositoryProviderMock } from '~mocks/UserRepositoryProviderMock'
import { randUser } from '~mocks/randUser'
import { AccessTokenProviderMock } from '~mocks/AccessTokenProviderMock'

import { randEncryptedPassword } from '@core/shared/mocks'

import type { VerifyUserSessionInput } from '~/user/usecases/VerifyUserSession'
import type { AccessTokenPayload } from '~/user/providers/AccessTokenProvider'

import { VerifyUserSession } from '~/user/usecases/VerifyUserSession'

describe('VerifyUserSession', () => {
    const accessTokenProvider = new AccessTokenProviderMock()

    let token: string
    let payload: AccessTokenPayload
    let userRepositoryProvider: UserRepositoryProviderMock

    afterEach(() => {
        faker.seed()
    })

    beforeEach(async () => {
        const user = randUser({ password: randEncryptedPassword() })

        payload = { userId: user.id }
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

        const { id } = randUser()

        const payload = { userId: id }
        const token = accessTokenProvider.create(payload)

        const input: VerifyUserSessionInput = { token }

        await expect(verifyUserSession.execute(input)).rejects.toThrowError(
            'O token acesso não corresponde a um usuário cadastrado'
        )
    })
})
