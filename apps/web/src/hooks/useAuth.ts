import { use } from 'react'

import type { AuthContextValue } from '~/contexts/AuthContext'

import { AuthContext } from '~/contexts/AuthContext'

export function useAuth(): AuthContextValue {
    const ctx = use(AuthContext)

    if (!ctx) {
        throw new Error(
            'O hook useAuth deve ser usado dentro de <AuthContext.Provider>'
        )
    }

    return ctx
}
