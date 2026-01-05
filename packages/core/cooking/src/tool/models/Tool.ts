import type { EntityInput, EntityProps } from '@core/shared'

import z from 'zod'

import { Entity, entitySchema } from '@core/shared'

import { nameSchema, Name } from '~/shared/models/Name'
import { amountSchema, Amount } from '~/shared/models/Amount'

export interface ToolInput extends EntityInput {
    name: string
    amount: number
}

export type ToolProps = EntityProps<ToolInput>

export const toolSchema = z.object({
    ...entitySchema.shape,
    name: nameSchema,
    amount: amountSchema
})

export class Tool extends Entity<ToolInput> {
    readonly name: Name
    readonly amount: Amount

    constructor(input: ToolInput) {
        super(input)

        const { name, amount } = input

        this.name = new Name(name)
        this.amount = new Amount(amount)
    }

    get props(): ToolProps {
        return {
            id: this.id.value,
            name: this.name.value,
            amount: this.amount.value
        }
    }

    format(): string {
        return `${this.amount.value} ${this.name.value}`
    }
}
