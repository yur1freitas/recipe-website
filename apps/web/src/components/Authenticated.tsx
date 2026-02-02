'use client'

import { useAuth } from '~/hooks/useAuth'

export function Authenticated({
    children
}: DefaultProps): React.ReactNode | null {
    const { isAuth } = useAuth()

    if (isAuth) {
        return children
    }

    return null
}
