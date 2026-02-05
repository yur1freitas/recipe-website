import z from 'zod'
import { Time } from '@utils/time'

import { ValueObject, ZodValidator } from '@core/shared'

export const preparationTimeSchema = z
    .number()
    .positive('O tempo de preparo não pode ser nulo')

export const PreparationTimeValidator = new ZodValidator(preparationTimeSchema)

export class PreparationTime extends ValueObject<number> {
    protected $time: Time

    constructor(value: number) {
        super(PreparationTimeValidator, value)

        this.$time = Time.fromMilliseconds(this.value)
    }

    get ms(): number {
        return this.$time.ms
    }

    get seconds(): number {
        return this.$time.seconds
    }

    get minutes(): number {
        return this.$time.minutes
    }

    get hours(): number {
        return this.$time.hours
    }
}
