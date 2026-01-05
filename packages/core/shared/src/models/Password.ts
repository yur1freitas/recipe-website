import z from 'zod'

import { ZodValidator } from '../validators/ZodValidator'
import { ValueObject } from './ValueObject'

export const passwordSchema = z
    .string()
    .nonempty('A senha não pode ser vazia')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[a-z]/, 'A senha deve ter pelo menos 1 letra minúscula')
    .regex(/[A-Z]/, 'A senha deve ter pelo menos 1 letra maiúscula')
    .regex(/\d/, 'A senha deve ter pelo menos 1 número')
    .meta({
        title: 'Senha',
        examples: ['abc123ABC']
    })

export const PasswordValidator = new ZodValidator(passwordSchema)

export class Password extends ValueObject<string> {
    constructor(value: string) {
        super(PasswordValidator, value)
    }
}
