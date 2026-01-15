import { expect, describe, it, afterEach } from 'vitest'
import { faker } from '@faker-js/faker/locale/pt_BR'

import { randEncryptedPassword } from '~mocks/randEncryptedPassword'

import { EncryptedPassword } from '~/models/EncryptedPassword'

describe('EncryptedPassword', () => {
    afterEach(() => {
        faker.seed()
    })

    it('deve instanciar se o valor de entrada for válido', () => {
        const input = randEncryptedPassword()

        const encryptedPassword = new EncryptedPassword(input)

        expect(encryptedPassword.value).toBe(input)
    })

    it('deve lançar um erro se a senha for vazia', () => {
        expect(() => {
            const input = ''
            new EncryptedPassword(input)
        })
    })

    it('deve comparar se outro valor é igual a ele', () => {
        const targetEncryptedPassword = new EncryptedPassword(
            randEncryptedPassword()
        )
        const sameEncryptedPassword = new EncryptedPassword(
            targetEncryptedPassword.value
        )

        const otherEncryptedPassword = new EncryptedPassword(
            randEncryptedPassword()
        )

        expect(
            targetEncryptedPassword.equals(otherEncryptedPassword)
        ).toBeFalsy()

        expect(
            targetEncryptedPassword.equals(sameEncryptedPassword)
        ).toBeTruthy()
        expect(
            targetEncryptedPassword.equals(targetEncryptedPassword)
        ).toBeTruthy()
    })
})
