import { CustomError } from '@core/shared'

export class CookingError extends CustomError {
    static override isError(target: unknown): target is CookingError {
        return target instanceof CookingError && target.name === this.name
    }
}
