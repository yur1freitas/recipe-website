'use server'

import { redirect } from 'next/navigation'

import { verifySession } from '~/utils/verifySession'

import { AuthProvider } from './AuthProvider'

export async function Private({
    children
}: DefaultProps): Promise<React.JSX.Element> {
    const { user, isAuth } = await verifySession()

    if (!isAuth) {
        return redirect('/login')
    }

    return (
        <AuthProvider user={user} isAuth={isAuth}>
            {children}
        </AuthProvider>
    )
}
