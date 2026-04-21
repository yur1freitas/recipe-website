'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'

import type { UserPayload } from '@core/auth'

import type { AuthContextValue } from '~/contexts/AuthContext'

import { httpClient } from '~/client/http'

export type VerifySessionOutput = AuthContextValue

export const verifySession = cache(async (): Promise<VerifySessionOutput> => {
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

    return { user: data as UserPayload, isAuth: true }
})
