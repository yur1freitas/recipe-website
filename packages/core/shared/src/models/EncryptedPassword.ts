import z from 'zod'

import { ValueObject } from './ValueObject'
import { ZodValidator } from '../validators/ZodValidator'

export const encryptedPasswordSchema = z
    .string()
    .trim()
    .nonempty('A senha não pode ser vazia')

export const EncryptedPasswordValidator = new ZodValidator(
    encryptedPasswordSchema
)

export class EncryptedPassword extends ValueObject<string> {
    constructor(value: string) {
        super(EncryptedPasswordValidator, value)
    }
}
