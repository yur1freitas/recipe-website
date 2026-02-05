import z from 'zod'

import { Entity, entitySchema } from '@core/shared'
import type { EntityInput, EntityProps } from '@core/shared'

import { nameSchema, Name } from '~/shared/models/Name'

import type { UnitEnum } from '../constants/UnitEnum'

import { unitSchema, Unit } from './Unit'
import { measureSchema, Measure } from './Measure'

export interface IngredientInput extends EntityInput {
    name: string
    unit: UnitEnum
    measure: string
}

export type IngredientProps = EntityProps<IngredientInput>

export const ingredientSchema = z.object({
    ...entitySchema.shape,
    name: nameSchema,
    unit: unitSchema,
    measure: measureSchema
})

export class Ingredient extends Entity<IngredientInput> {
    readonly name: Name
    readonly unit: Unit
    readonly measure: Measure

    constructor(input: IngredientInput) {
        super(input)

        const { name, measure, unit } = input

        this.name = new Name(name)
        this.unit = new Unit(unit)
        this.measure = new Measure(measure)
    }

    get props(): IngredientProps {
        return {
            id: this.id.value,
            name: this.name.value,
            unit: this.unit.value,
            measure: this.measure.value
        }
    }

    format(): string {
        const isPlural = this.measure.toNumber() > 1

        return `${this.measure.value} ${this.unit.format(
            isPlural
        )} de ${this.name.value}`
    }
}
