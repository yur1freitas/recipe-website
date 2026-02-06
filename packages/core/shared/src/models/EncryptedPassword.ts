import z from 'zod'

import { ValueObject } from './ValueObject'
import { StandardValidator } from '../validators/StandardValidator'

export const encryptedPasswordSchema = z
    .string()
    .trim()
    .nonempty('A senha não pode ser vazia')

export const EncryptedPasswordValidator = new StandardValidator(
    encryptedPasswordSchema
)

export class EncryptedPassword extends ValueObject<string> {
    constructor(value: string) {
        super(EncryptedPasswordValidator, value)
    }
}
