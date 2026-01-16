import { use } from 'react'

import type { PasswordContextValue } from '~/contexts/PasswordContext'

import { PasswordContext } from '~/contexts/PasswordContext'

export function usePasswordContext(): PasswordContextValue {
    const ctx = use(PasswordContext)

    if (!ctx) {
        throw new Error(
            'O hook usePasswordContext deve ser usado dentro de <PasswordRoot>'
        )
    }

    return ctx
}
