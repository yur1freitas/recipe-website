import { useCallback, useEffect, useState } from 'react'
import { isNumeric, Numeric } from '@utils/numeric'

import { useBoolean } from './useBoolean'

export interface ChangeRawValueEvent {
    isValid: boolean
    rawValue: string
}

export type ChangeValueHandler = (value: Numeric) => void
export type ChangeRawValueHandler = (event: ChangeRawValueEvent) => void

export type SetRawValueFn = React.Dispatch<React.SetStateAction<string>>
export type SetValueFn = React.Dispatch<React.SetStateAction<Numeric>>

export type State = 'valid' | 'invalid'

export interface UseNumericInput {
    value?: Numeric
    rawValue?: string
    onValueChange?: ChangeValueHandler
    onRawValueChange?: ChangeRawValueHandler
    defaultState?: State
}

export interface UseNumericOutput {
    value: Numeric
    rawValue: string
    setValue: SetValueFn
    setRawValue: SetRawValueFn
    isValid: boolean
    isInvalid: boolean
}

export function useNumeric({
    value = new Numeric('0'),
    rawValue = '',
    onValueChange,
    onRawValueChange,
    defaultState = 'invalid'
}: UseNumericInput = {}): UseNumericOutput {
    const { value: isValid, setValue: setIsValid } = useBoolean(
        defaultState === 'valid'
    )

    const [currentRawValue, setCurrentRawValue] = useState<string>(
        () => rawValue
    )
    const [currentValue, setCurrentValue] = useState<Numeric>(() => value)

    const setValue: SetValueFn = useCallback(
        (input) => {
            const newValue =
                typeof input === 'function' ? input(currentValue) : input

            onValueChange?.(newValue)
            setCurrentValue(newValue)
        },
        [currentValue, onValueChange]
    )

    const setRawValue: SetRawValueFn = useCallback(
        (input) => {
            const newRaw =
                typeof input === 'function' ? input(currentRawValue) : input

            const isValid = isNumeric(newRaw)

            onRawValueChange?.({ isValid, rawValue: newRaw })
            setCurrentRawValue(newRaw)

            if (isValid) {
                const numeric = new Numeric(newRaw)

                onValueChange?.(numeric)
                setCurrentValue(numeric)
            }

            setIsValid(isValid)
        },
        [currentRawValue, onValueChange, onRawValueChange] // oxlint-disable-line react/exhaustive-deps
    )

    useEffect(() => {
        if (isNumeric(rawValue)) {
            const numeric = new Numeric(rawValue)

            setIsValid(true)
            setCurrentValue(numeric)
        }
    }, [rawValue]) // oxlint-disable-line react/exhaustive-deps

    return {
        isValid,
        isInvalid: !isValid,
        value: currentValue,
        rawValue: currentRawValue,
        setValue,
        setRawValue
    }
}
