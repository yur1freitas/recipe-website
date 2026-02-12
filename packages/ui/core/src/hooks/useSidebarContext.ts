import { use } from 'react'

import type { SidebarContextValue } from '~/contexts/SidebarContext'

import { SidebarContext } from '~/contexts/SidebarContext'

export function useSidebarContext(): SidebarContextValue {
    const ctx = use(SidebarContext)

    if (!ctx) {
        throw new Error(
            'O hook useSidebarContext deve ser usado dentro de <Sidebar.Root>'
        )
    }

    return ctx
}
