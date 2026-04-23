'use server'

import { cookies } from 'next/headers'

import type { AuthContextValue } from '~/contexts/AuthContext'

import { httpClient } from '~/client/http'

export type VerifySessionOutput = AuthContextValue

export const verifySession = async (): Promise<VerifySessionOutput> => {
    const cookieStore = await cookies()

    if (!cookieStore.has('accessToken')) {
        return { user: null, isAuth: false }
    }

    const { error: verifyError } = await httpClient.GET('/auth/verify', {
        params: {
            query: { payload: false }
        },
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (verifyError) {
        return { user: null, isAuth: false }
    }

    const { data, error } = await httpClient.GET('/auth/me', {
        next: {
            tags: ['auth:me'],
            revalidate: 3_600 // 1 hora
        },
        headers: {
            Cookie: cookieStore.toString()
        }
    })

    if (error) {
        return { user: null, isAuth: false }
    }

    return { user: data, isAuth: true }
}
