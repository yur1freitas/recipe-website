import type { Validator } from '../validators/Validator'

export abstract class ValueObject<TValue> {
    readonly value: TValue

    constructor(validator: Validator<TValue>, value?: TValue) {
        this.value = validator.execute(value)
    }

    equals(target: this): boolean {
        return target instanceof this.constructor && target.value === this.value
    }
}
