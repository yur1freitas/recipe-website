'use client'

import { cx } from 'tailwind-variants/utils'
import { useEffect } from 'react'

import { useSearchContext } from '~/hooks/useSearchContext'

import type { InputProps } from '../Input'

import { Input } from '../Input'

export type SearchInputProps = InputProps

export function SearchInput({
    type = 'search',
    role = 'searchbox',
    id,
    className,
    onValueChange,
    ...props
}: SearchInputProps): React.JSX.Element {
    const classNames = cx('search-input', className)

    const { value, defaultValue, inputId, setInputId, handleValueChange } =
        useSearchContext()

    const _onValueChange: SearchInputProps['onValueChange'] = (
        value,
        event
    ) => {
        onValueChange?.(value, event)
        handleValueChange(value)
    }

    useEffect(() => {
        if (id) setInputId(id)
    }, [id, setInputId])

    return (
        <Input
            id={inputId}
            type={type}
            role={role}
            className={classNames}
            value={value}
            defaultValue={defaultValue}
            onValueChange={_onValueChange}
            {...props}
        />
    )
}
