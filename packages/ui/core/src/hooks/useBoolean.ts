import { useState } from 'react'

export interface UseBooleanReturn {
    value: boolean
    setValue: React.Dispatch<React.SetStateAction<boolean>>
    toggle: () => void
    setTrue: () => void
    setFalse: () => void
}

export function useBoolean(defaultValue: boolean = false): UseBooleanReturn {
    const [value, setValue] = useState(defaultValue)

    const toggle = () => setValue((value) => !value)
    const setTrue = () => setValue(true)
    const setFalse = () => setValue(false)

    return {
        value,
        setValue,
        toggle,
        setTrue,
        setFalse
    }
}
