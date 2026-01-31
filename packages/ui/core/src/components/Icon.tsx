import { cx } from 'tailwind-variants/utils'
import { cloneElement, Children } from 'react'

import { VisuallyHidden } from './VisuallyHidden'

export interface IconProps extends React.ComponentProps<'svg'> {
    label?: string
    children: React.JSX.Element
}

/**
 * @link https://github.com/radix-ui/primitives/blob/main/packages/react/accessible-icon/src/accessible-icon.tsx
 */
export function Icon({
    label,
    children,
    className,
    ...props
}: IconProps): React.JSX.Element {
    const child = Children.only(children)
    const classNames = cx(child.props?.className, className)

    const clonedIcon = cloneElement(child, {
        ...props,
        'className': classNames,
        'aria-hidden': true,
        'focusable': false
    })

    return (
        <>
            {clonedIcon}
            {label && <VisuallyHidden>{label}</VisuallyHidden>}
        </>
    )
}
