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

const DEFAULT_OPTIONS: Required<RandUserOptions> = {
    id: randId(),
    name: randUsername(),
    email: randEmail(),
    password: randPassword()
}

export function randUser(options?: RandUserOptions): Required<UserProps> {
    const user = { ...DEFAULT_OPTIONS, ...options }

    return user
}
