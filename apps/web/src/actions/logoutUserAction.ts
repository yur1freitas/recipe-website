'use server'

import { cookies } from 'next/headers'

import { httpClient } from '~/client/http'

export type LogoutUserActionInput = undefined

export async function logoutUserAction(): Promise<ActionState> {
    const cookieStore = await cookies()

    if (!cookieStore.has('accessToken')) {
        return { status: 'success' }
    }

    const { error } = await httpClient.GET('/auth/logout', {
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    cookieStore.delete('accessToken')

    return error
        ? { status: 'failed', error: error.message }
        : { status: 'success' }
}
