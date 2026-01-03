import { createContext, use, useState } from 'react'

export interface PasswordInputContextValue {
    inputId: string
    setInputId: (value: string) => void
    isVisible: boolean
    toggleVisibility: () => void
}

export const PasswordInputContext =
    createContext<PasswordInputContextValue | null>(null)

export function usePasswordInput(): PasswordInputContextValue {
    const ctx = use(PasswordInputContext)

    if (!ctx) {
        throw new Error(
            'O hook usePasswordInput deve ser usado dentro de <PasswordInputRoot>'
        )
    }

    return ctx
}

export interface PasswordInputRootProps {
    id: string
    children?: React.ReactNode[] | React.ReactNode
}

export function PasswordInputRoot({
    id,
    children
}: PasswordInputRootProps): React.JSX.Element {
    const [inputId, setInputId] = useState<string>(id)

    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible((state) => !state)

    const value = {
        inputId,
        setInputId,
        isVisible,
        toggleVisibility
    }

    return (
        <PasswordInputContext value={value}>
            <div className='input w-full relative'>{children}</div>
        </PasswordInputContext>
    )
}
