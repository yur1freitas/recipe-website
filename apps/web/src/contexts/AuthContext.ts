import { createContext } from 'react'

import type { UserPayload } from '@core/auth'

export interface AuthContextValue {
    isAuth: boolean
    user: UserPayload | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export interface AuthProviderProps {
    children?: React.ReactNode[] | React.ReactNode
}
