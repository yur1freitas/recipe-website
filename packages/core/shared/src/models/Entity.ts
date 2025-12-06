import type { Constructor, Ensure } from '../types'
import { Id } from './Id'

export interface EntityInput {
    id?: string
}

export type EntityProps<T extends EntityInput> = Ensure<T, 'id'>

export abstract class Entity<TInput extends EntityInput> {
    readonly id: Id

    constructor({ id }: TInput) {
        this.id = new Id(id)
    }

    abstract get props(): EntityProps<TInput>

    clone(input?: Partial<TInput>): this {
        const constructor = this.constructor as Constructor<TInput, this>
        return new constructor({ ...this.props, ...input })
    }

    equals(target: this): boolean {
        return target instanceof this.constructor && target.id.equals(this.id)
    }
}
