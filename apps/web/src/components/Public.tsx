'use server'

import { verifySession } from '~/utils/verifySession'

import { AuthProvider } from './AuthProvider'

export async function Public({
    children
}: DefaultProps): Promise<React.JSX.Element> {
    const { user, isAuth } = await verifySession()

    return (
        <AuthProvider user={user} isAuth={isAuth}>
            {children}
        </AuthProvider>
    )
}
