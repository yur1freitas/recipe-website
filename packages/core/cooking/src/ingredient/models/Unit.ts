import z from 'zod'

import { ValueObject, ZodValidator } from '@core/shared'

import { UNIT_NAMES } from '../constants/unitNames'
import { UnitEnum } from '../constants/UnitEnum'

export const $unitSchema = z.enum(
    UnitEnum,
    'A unidade de medida precisa ser válida'
)

export const UnitValidator = new ZodValidator($unitSchema)

export class Unit extends ValueObject<UnitEnum> {
    constructor(value: UnitEnum) {
        super(UnitValidator, value)
    }

    format(plural?: boolean): string {
        const name = UNIT_NAMES[this.value]
        return plural ? name.plural : name.singular
    }
}
