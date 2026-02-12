import { createContext } from 'react'

export interface SidebarContextValue {
    isMobile: boolean
    isOpen: boolean
    open: () => void
    close: () => void
    toggle: () => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpenMobile: boolean
    openMobile: () => void
    closeMobile: () => void
    toggleMobile: () => void
    setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>
    toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)
