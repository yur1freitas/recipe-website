import { v7 } from 'uuid'
import z from 'zod'

import { ZodValidator } from '../validators/ZodValidator'
import { ValueObject } from './ValueObject'

export const idSchema = z
    .uuidv7('O id deve ser válido')
    .default(() => v7())
    .meta({ examples: [v7()] })

export const IdValidator = new ZodValidator(idSchema)

export class Id extends ValueObject<string> {
    readonly isCreated: boolean

    constructor(value?: string) {
        super(IdValidator, value)

        this.isCreated = !value
    }

    timestamp(): Date {
        const hex = this.value.slice(0, 13).replace('-', '')
        const timestamp = parseInt(hex, 16)
        const date = new Date(timestamp)

        return date
    }
}
