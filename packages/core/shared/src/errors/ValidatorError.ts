import { CustomError, CustomErrorInput } from './CustomError'

export type ValidatorErrorInput = CustomErrorInput

export class ValidatorError extends CustomError {
    static override isError(target: unknown): target is ValidatorError {
        return target instanceof ValidatorError && target.name === this.name
    }
}
