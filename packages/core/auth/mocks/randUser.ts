import type { UserProps } from '~/user/models/User'

import {
    randEmail,
    randId,
    randPassword,
    randUsername
} from '@core/shared/mocks'

export interface RandUserOptions {
    id?: string
    name?: string
    email?: string
    password?: string
}

export function randUser(options?: RandUserOptions): Required<UserProps> {
    const user = {
        id: options?.id ?? randId(),
        name: options?.name ?? randUsername(),
        email: options?.email ?? randEmail(),
        password: options?.password ?? randPassword()
    }

    return user
}
