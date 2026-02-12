import { useMemo } from 'react'

import { useMediaQuery } from '~/hooks/useMediaQuery'
import { useBoolean } from '~/hooks/useBoolean'
import { SidebarContext } from '~/contexts/SidebarContext'

export interface SidebarRootProps {
    open?: boolean
    openMobile?: boolean
    children?: React.ReactNode
}

export function SidebarRoot({
    open: openState = true,
    openMobile: openMobileState = false,
    children
}: SidebarRootProps): React.JSX.Element {
    const isMobile = useMediaQuery({ query: '(width < 768px)' })

    const {
        value: isOpen,
        setValue: setOpen,
        setTrue: open,
        setFalse: close,
        toggle
    } = useBoolean(openState)

    const {
        value: isOpenMobile,
        setValue: setOpenMobile,
        setTrue: openMobile,
        setFalse: closeMobile,
        toggle: toggleMobile
    } = useBoolean(openMobileState)

    const toggleSidebar = isMobile ? toggleMobile : toggle

    const value = useMemo(
        () => ({
            isMobile,
            isOpen,
            setOpen,
            open,
            close,
            toggle,
            isOpenMobile,
            setOpenMobile,
            openMobile,
            closeMobile,
            toggleMobile,
            toggleSidebar
        }),
        [
            isMobile,
            isOpen,
            setOpen,
            open,
            close,
            toggle,
            isOpenMobile,
            setOpenMobile,
            openMobile,
            closeMobile,
            toggleMobile,
            toggleSidebar
        ]
    )

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    )
}
