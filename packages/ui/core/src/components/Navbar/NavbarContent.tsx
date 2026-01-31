import { cx } from 'tailwind-variants/lite'

export type NavbarContentProps = React.ComponentProps<'nav'>

export function NavbarContent({
    className,
    children,
    ...props
}: NavbarContentProps): React.JSX.Element {
    const classNames = cx('navbar-brand', className)

    return (
        <nav className={classNames} {...props}>
            {children}
        </nav>
    )
}
