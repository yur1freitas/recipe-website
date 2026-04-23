'use server'

import { cookies } from 'next/headers'

import { httpClient } from '~/client/http'

export async function deleteUserAction(): Promise<ActionState> {
    const cookieStore = await cookies()

    const { error } = await httpClient.POST('/auth/delete', {
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (error) {
        return { status: 'failed', error: error.message }
    }

    cookieStore.delete('accessToken')

    return { status: 'success' }
}
