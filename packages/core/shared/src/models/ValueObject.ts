import type { JsonValue } from '~/types'

import type { Validator } from '../validators/Validator'

export abstract class ValueObject<TValue extends JsonValue> {
    readonly value: TValue

    constructor(validator: Validator<TValue>, value?: TValue) {
        this.value = validator.execute(value)
    }

    equals(target: this): boolean {
        return target instanceof this.constructor && target.value === this.value
    }
}
