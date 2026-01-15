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
    ...props
}: IconProps): React.JSX.Element {
    const clonedIcon = cloneElement(Children.only(children), {
        ...props,
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
