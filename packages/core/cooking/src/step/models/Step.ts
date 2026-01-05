import type { EntityInput, EntityProps } from '@core/shared'
import { Entity, entitySchema } from '@core/shared'

import z from 'zod'
import { orderSchema, Order } from '~/shared/models/Order'
import { descriptionSchema, Description } from '~/shared/models/Description'

export interface StepInput extends EntityInput {
    order: number
    description: string
}

export type StepProps = EntityProps<StepInput>

export const stepSchema = z.object({
    ...entitySchema.shape,
    order: orderSchema,
    description: descriptionSchema
})

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
