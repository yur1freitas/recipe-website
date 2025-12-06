import z from 'zod'

import { ValueObject, ZodValidator } from '@core/shared'
import { Time } from '@core/time'

export const $preparationTimeSchema = z
    .instanceof(Time)
    .refine(
        time => time.toMilliseconds() > 0,
        'O tempo de preparo não pode ser nulo'
    )

export const PreparationTimeValidator = new ZodValidator($preparationTimeSchema)

export class PreparationTime extends ValueObject<Time> {
    constructor(value: Time) {
        super(PreparationTimeValidator, value)
    }

    get ms(): number {
        return this.value.ms
    }

    get seconds(): number {
        return this.seconds
    }

    get minutes(): number {
        return this.minutes
    }

    get hours(): number {
        return this.hours
    }

    override equals(target: PreparationTime): boolean {
        return (
            target instanceof PreparationTime
            && target.value.toMilliseconds() === this.value.toMilliseconds()
        )
    }
}
