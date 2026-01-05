import z from 'zod'

import { ValueObject, ZodValidator } from '@core/shared'

import { DIFFICULTY_NAMES } from '../constants/difficultyNames'
import { DifficultyEnum } from '../constants/DifficultyEnum'

export const difficultySchema = z.enum(
    DifficultyEnum,
    'A dificuldade deve ser válida'
)

export const DifficultyValidator = new ZodValidator(difficultySchema)

export class Difficulty extends ValueObject<DifficultyEnum> {
    constructor(value: DifficultyEnum) {
        super(DifficultyValidator, value)
    }

    format(): string {
        return DIFFICULTY_NAMES[this.value]
    }
}
