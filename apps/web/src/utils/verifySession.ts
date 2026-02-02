'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'

import { httpClient } from '~/client/http'

export const verifySession = cache(async () => {
    const cookieStore = await cookies()

    if (!cookieStore.has('accessToken')) {
        return { user: null, isAuth: false }
    }

    const { error } = await httpClient.GET('/auth/verify', {
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (error) {
        return { user: null, isAuth: false }
    }

    return { user: null, isAuth: true }
})
