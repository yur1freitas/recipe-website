'use client'

import type { Numeric } from '@utils/numeric'

import { useEffect, useImperativeHandle, useRef } from 'react'

import type {
    ChangeRawValueHandler,
    ChangeValueHandler
} from '~/hooks/useNumeric'

import { useNumeric } from '~/hooks/useNumeric'

import type { InputProps } from './Input'

import { Input } from './Input'

export const DEFAULT_ERROR_MESSAGE =
    'A entrada deve ser um valor numérico válido'

export type NumericInputProps = Omit<
    InputProps,
    'value' | 'defaultValue' | 'onValueChange'
> & {
    value?: Numeric | string
    defaultValue?: Numeric | string
    onValueChange?: ChangeValueHandler
    onRawValueChange?: ChangeRawValueHandler
    errorMessage?: string
}

export function NumericInput({
    ref,
    value = '',
    defaultValue = '',
    onValueChange,
    onRawValueChange,
    autoComplete = 'off',
    errorMessage = DEFAULT_ERROR_MESSAGE,
    ...props
}: NumericInputProps): React.JSX.Element {
    const inputRef = useRef<HTMLInputElement | null>(null)

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
        ref,
        () => inputRef.current
    )

    const { rawValue, setRawValue, isInvalid } = useNumeric({
        rawValue: String(value ?? defaultValue),
        onValueChange,
        onRawValueChange,
        defaultState: 'valid'
    })

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.setCustomValidity(isInvalid ? errorMessage : '')
        }
    }, [inputRef, isInvalid, errorMessage])

    return (
        <Input
            ref={inputRef}
            aria-invalid={isInvalid}
            aria-errormessage={isInvalid ? errorMessage : ''}
            value={rawValue}
            onValueChange={setRawValue}
            autoComplete={autoComplete}
            {...props}
        />
    )
}
