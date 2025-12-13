'use server'

import type { RegisterUserInput } from '@core/auth'

import { httpClient } from '~/client/http'

export interface RegisterUserActionInput extends RegisterUserInput {
    captcha: string
}

export async function registerUserAction(
    _: ActionState,
    data: RegisterUserActionInput
): Promise<ActionState> {
    const { name, email, password } = data

    const { error } = await httpClient.POST('/auth/register', {
        body: {
            name,
            email,
            password
        }
    })

    if (error) {
        return { status: 'failed', error: error.message }
    }

    return { status: 'success' }
}
