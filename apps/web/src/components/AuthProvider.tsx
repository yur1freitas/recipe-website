'use client'

import type { AuthContextValue } from '~/contexts/AuthContext'

import { AuthContext } from '~/contexts/AuthContext'

export interface AuthProviderProps extends AuthContextValue {
    children?: React.ReactNode
}

export function AuthProvider({
    user,
    isAuth,
    children
}: AuthProviderProps): React.JSX.Element {
    return (
        <AuthContext.Provider value={{ user, isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}
