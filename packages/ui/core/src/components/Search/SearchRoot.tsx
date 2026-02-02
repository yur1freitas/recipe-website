'use client'

import type { VariantProps } from 'tailwind-variants/lite'

import { tv } from 'tailwind-variants/lite'
import { useId, useState } from 'react'
import { useRender } from '@base-ui/react/use-render'

import { SearchContext } from '~/contexts/SearchContext'

const search = tv({
    base: 'search-root',
    variants: {
        variant: {
            default: 'search-default',
            reversed: 'search-reversed'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
})

export type SearchRootProps = useRender.ComponentProps<'form'> &
    VariantProps<typeof search> & {
        inputId?: string
        dirt?: boolean
        value?: string
        defaultValue?: string
        onValueClear?: () => void
        onValueChange?: (value: string) => void
    }

export function SearchRoot({
    variant,
    ref,
    render,
    className,
    dirt = false,
    value = '',
    defaultValue,
    onValueClear,
    onValueChange,
    ...props
}: SearchRootProps): React.JSX.Element {
    const defaultId = useId()

    const [inputId, setInputId] = useState(defaultId)
    const [valueState, setValue] = useState(() => value)
    const [isDirty, setIsDirt] = useState(() => dirt)

    const classNames = search({ variant, className })

    const element = useRender({
        defaultTagName: 'form',
        render,
        ref,
        props: {
            role: 'search',
            className: classNames,
            ...props
        }
    })

    const handleValueClear = () => {
        setValue('')
        setIsDirt(false)
        onValueClear?.()
    }

    const handleValueChange = (value: string) => {
        setIsDirt(true)
        setValue(value)
        onValueChange?.(value)
    }

    return (
        <SearchContext.Provider
            value={{
                inputId,
                setInputId,
                value: valueState,
                defaultValue,
                handleValueClear,
                handleValueChange,
                isDirty,
                setIsDirt
            }}
        >
            {element}
        </SearchContext.Provider>
    )
}
