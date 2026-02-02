import { useCallback, useState } from 'react'

export interface UseBooleanReturn {
    value: boolean
    setValue: React.Dispatch<React.SetStateAction<boolean>>
    toggle: () => void
    setTrue: () => void
    setFalse: () => void
}

export function useBoolean(defaultValue: boolean = false): UseBooleanReturn {
    const [value, setValue] = useState(defaultValue)

    const toggle = useCallback(() => setValue((value) => !value), [setValue])
    const setTrue = useCallback(() => setValue(true), [setValue])
    const setFalse = useCallback(() => setValue(false), [setValue])

    return {
        value,
        setValue,
        toggle,
        setTrue,
        setFalse
    }
}
