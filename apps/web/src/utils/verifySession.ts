'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'

import { httpClient } from '~/client/http'

export const verifySession = cache(async () => {
    const cookieStore = await cookies()

    if (!cookieStore.has('accessToken')) {
        return { user: null, isAuth: false }
    }

    const { data, error } = await httpClient.GET('/auth/verify', {
        params: {
            query: {
                payload: true
            }
        },
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (error) {
        return { user: null, isAuth: false }
    }

    return { user: data, isAuth: true }
})
