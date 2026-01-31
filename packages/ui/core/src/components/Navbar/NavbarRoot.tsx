import { cx } from 'tailwind-variants/lite'

export type NavbarRootProps = React.ComponentProps<'header'>

export function NavbarRoot({
    className,
    children,
    ...props
}: NavbarRootProps): React.JSX.Element {
    const classNames = cx('navbar-root', className)

    return (
        <header className={classNames} {...props}>
            {children}
        </header>
    )
}
