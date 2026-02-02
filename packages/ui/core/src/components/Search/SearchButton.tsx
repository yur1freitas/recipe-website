'use client'

import { cx } from 'tailwind-variants/utils'

import type { ButtonProps } from '../Button'

import { Button } from '../Button'

export type SearchButtonProps = ButtonProps

export function SearchButton({
    variant = 'outline',
    size = 'icon',
    type = 'submit',
    className,
    ...props
}: SearchButtonProps): React.JSX.Element {
    const classNames = cx('search-button', className)

    return (
        <Button
            variant={variant}
            size={size}
            type={type}
            className={classNames}
            {...props}
        />
    )
}
