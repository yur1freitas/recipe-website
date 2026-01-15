import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { InvalidTokenRepositoryProviderMock } from '~mocks/InvalidTokenRepositoryProviderMock'
import { AccessTokenProviderMock } from '~mocks/AccessTokenProviderMock'
import { randUser } from '~mocks/randUser'

import type { LogoutUserInput } from '~/user/usecases/LogoutUser'

import { LogoutUser } from '~/user/usecases/LogoutUser'

describe('LogoutUser', () => {
    const accessTokenProvider = new AccessTokenProviderMock()

    let token: string
    let invalidTokenRepositoryProvider: InvalidTokenRepositoryProviderMock

    afterEach(() => {
        faker.seed()
    })

    beforeEach(async () => {
        const { id, name, email } = randUser()
        token = accessTokenProvider.create({ id, name, email })

        invalidTokenRepositoryProvider =
            new InvalidTokenRepositoryProviderMock()
    })

    it('deve deslogar um usuário', async () => {
        const logoutUser = new LogoutUser(
            accessTokenProvider,
            invalidTokenRepositoryProvider
        )

        const input: LogoutUserInput = { token }

        await expect(logoutUser.execute(input)).resolves.toBeNullable()

        expect(invalidTokenRepositoryProvider.exists(token)).toBeTruthy()
    })

    it('deve lançar um erro se o token for inválido', async () => {
        const logoutUser = new LogoutUser(
            accessTokenProvider,
            invalidTokenRepositoryProvider
        )

        const input: LogoutUserInput = { token: faker.string.alphanumeric() }

        await expect(logoutUser.execute(input)).rejects.toThrowError(
            'O token de acesso expirado ou inválido'
        )
    })

    it('deve lançar um erro se o token estiver invalidado', async () => {
        const logoutUser = new LogoutUser(
            accessTokenProvider,
            invalidTokenRepositoryProvider
        )

        invalidTokenRepositoryProvider.create(token)

        const input: LogoutUserInput = { token }

        await expect(logoutUser.execute(input)).rejects.toThrowError(
            'O token de acesso está invalidado'
        )
    })
})
