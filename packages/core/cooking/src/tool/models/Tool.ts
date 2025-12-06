import { Entity, EntityInput, EntityProps } from '@core/shared'

import { Amount } from '~/shared/models/Amount'
import { Name } from '~/shared/models/Name'

export interface ToolInput extends EntityInput {
    name: string
    amount: number
}

export type ToolProps = EntityProps<ToolInput>

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
