import { cx } from 'tailwind-variants/lite'
import { useRender } from '@base-ui/react'

export type NavbarLinkProps = useRender.ComponentProps<'a'> & {
    active?: boolean
}

export function NavbarLink({
    ref,
    render,
    active,
    className,
    ...props
}: NavbarLinkProps): React.JSX.Element {
    const classNames = cx('navbar-link', className)

    const element = useRender({
        defaultTagName: 'a',
        ref,
        render,
        props: {
            'data-active': active,
            'className': classNames,
            ...props
        }
    })

    return element
}
