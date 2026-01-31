import React, { createContext } from 'react'

export interface SearchContextValue {
    inputId: string
    setInputId: React.Dispatch<React.SetStateAction<string>>
    value?: string
    defaultValue?: string
    handleValueClear: () => void
    handleValueChange: (value: string) => void
    isDirty?: boolean
    setIsDirt: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchContext = createContext<SearchContextValue | null>(null)
