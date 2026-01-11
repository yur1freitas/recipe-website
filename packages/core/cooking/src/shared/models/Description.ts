import z from 'zod'

import { ValueObject, ZodValidator } from '@core/shared'

export const descriptionSchema = z
    .string('A descrição deve ser um texto')
    .trim()
    .nonempty('A descrição não pode ser vazia')
    .max(256, 'A descrição deve ter no máximo 256 caracteres')
    .regex(
        /^[\p{L}\p{M}\d\s,;.'"()]+$/iu,
        'A descrição deve conter apenas caracteres permitidos'
    )

export const DescriptionValidator = new ZodValidator(descriptionSchema)

export class Description extends ValueObject<string> {
    constructor(value: string) {
        super(DescriptionValidator, value)
    }
}
