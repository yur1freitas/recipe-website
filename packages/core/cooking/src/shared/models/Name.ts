import { ValueObject, ZodValidator } from '@core/shared'
import z from 'zod'

export const $nameSchema = z
    .string('O nome deve ser um texto')
    .trim()
    .nonempty('O nome não pode ser vazio')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(64, 'O nome deve ter no máximo 64 caracteres')
    .regex(/^[\p{L}\p{M}\d\s-]+$/iu, 'O nome deve ser válido')

export const NameValidator = new ZodValidator($nameSchema)

export class Name extends ValueObject<string> {
    constructor(value: string) {
        super(NameValidator, value)
    }
}
