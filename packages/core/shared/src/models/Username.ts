import z from 'zod'

import { ZodValidator } from '../validators/ZodValidator'
import { ValueObject } from './ValueObject'

export const usernameSchema = z
    .string()
    .trim()
    .nonempty('O nome não pode ser vazio')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(120, 'O nome deve ter no máximo 120 caracteres')
    .regex(/^[\p{L}\d\s-]+$/iu, 'O nome deve conter somente caracteres válidos')
    .meta({
        title: 'Nome de Usuário',
        examples: ['John Doe']
    })

export const UsernameValidator = new ZodValidator(usernameSchema)

export class Username extends ValueObject<string> {
    constructor(value: string) {
        super(UsernameValidator, value)
    }
}
