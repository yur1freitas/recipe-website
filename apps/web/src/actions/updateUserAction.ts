'use server'

import { cookies } from 'next/headers'
import { updateTag } from 'next/cache'

import type { UpdateUserInput } from '@core/auth'

import { httpClient } from '~/client/http'

export interface UpdateUserActionInput extends Omit<UpdateUserInput, 'id'> {
    captcha: string
}

export async function updateUserAction(
    _: ActionState,
    data: UpdateUserActionInput
): Promise<ActionState> {
    const { name, email, password, captcha } = data

    const cookieStore = await cookies()

    const { error } = await httpClient.POST('/auth/update', {
        body: {
            name,
            email,
            password,
            captcha
        },
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (error) {
        return { status: 'failed', error: error.message }
    }

    updateTag('auth:me')

    return { status: 'success' }
}
