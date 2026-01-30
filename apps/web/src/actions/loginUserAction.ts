'use server'

import { cookies } from 'next/headers'

import type { LoginUserInput } from '@core/auth'

import { httpClient } from '~/client/http'

export interface LoginUserActionInput extends LoginUserInput {
    captcha: string
}

export async function loginUserAction(
    _: ActionState,
    input: LoginUserActionInput
): Promise<ActionState> {
    const { email, password, captcha } = input

    const { data, error } = await httpClient.POST('/auth/login', {
        body: {
            email,
            password,
            captcha
        }
    })

    if (error) {
        return { status: 'failed', error: error.message }
    }

    const accessToken = data.token

    const cookieStore = await cookies()
    cookieStore.set('accessToken', accessToken, {
        path: '/',
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1 // 1 hora
    })

    return { status: 'success' }
}
