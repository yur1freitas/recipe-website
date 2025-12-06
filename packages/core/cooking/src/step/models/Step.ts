import { Entity, EntityInput, EntityProps } from '@core/shared'

import { Description } from '~/shared/models/Description'
import { Order } from '~/shared/models/Order'

export interface StepInput extends EntityInput {
    order: number
    description: string
}

export type StepProps = EntityProps<StepInput>

export class Step extends Entity<StepInput> {
    readonly order: Order
    readonly description: Description

    constructor(input: StepInput) {
        super(input)

        const { order, description } = input

        this.order = new Order(order)
        this.description = new Description(description)
    }

    get props(): StepProps {
        return {
            id: this.id.value,
            order: this.order.value,
            description: this.description.value
        }
    }
}
