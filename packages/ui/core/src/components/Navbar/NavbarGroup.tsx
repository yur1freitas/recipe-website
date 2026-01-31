import { cx } from 'tailwind-variants/lite'

export type NavbarGroupProps = React.ComponentProps<'ul'>

export function NavbarGroup({
    className,
    children,
    ...props
}: NavbarGroupProps): React.JSX.Element {
    const classNames = cx('navbar-group', className)

    return (
        <ul className={classNames} {...props}>
            {children}
        </ul>
    )
}
