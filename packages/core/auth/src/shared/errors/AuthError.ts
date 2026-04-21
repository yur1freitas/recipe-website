import type { CustomErrorInput } from '@core/shared'

import { CustomError } from '@core/shared'

export type AuthErrorInput = CustomErrorInput

export class AuthError extends CustomError {
    static override isError(target: unknown): target is AuthError {
        return target instanceof AuthError && target.name === this.name
    }
}
