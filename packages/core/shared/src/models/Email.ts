import z from 'zod'

import { ValueObject } from './ValueObject'
import { StandardValidator } from '../validators/StandardValidator'

export const emailSchema = z
    .email('O email fornecido não é válido')
    .trim()
    .nonempty('O email não pode ser vazio')
    .meta({
        title: 'Endereço de Email',
        examples: ['user@example.com']
    })

export const EmailValidator = new StandardValidator(emailSchema)

export class Email extends ValueObject<string> {
    constructor(value: string) {
        super(EmailValidator, value)
    }
}
