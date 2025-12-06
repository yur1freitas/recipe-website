import type { EntityInput, EntityProps } from '@core/shared'
import { Entity } from '@core/shared'

import { Name } from '~/shared/models/Name'
import { UnitEnum } from '../constants/UnitEnum'

import { Measure } from './Measure'
import { Unit } from './Unit'

export interface IngredientInput extends EntityInput {
    name: string
    unit: UnitEnum
    measure: string
}

export type IngredientProps = EntityProps<IngredientInput>

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
        const isPlural = false

        return `${this.measure.value} ${
            this.unit.format(isPlural)
        } de ${this.name.value}`
    }
}
