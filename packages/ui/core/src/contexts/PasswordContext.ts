import { createContext } from 'react'

export interface PasswordContextValue {
    inputId: string
    setInputId: (value: string) => void
    isHidden: boolean
    isVisible: boolean
    toggleVisibility: () => void
}

export const PasswordContext = createContext<PasswordContextValue | null>(null)
