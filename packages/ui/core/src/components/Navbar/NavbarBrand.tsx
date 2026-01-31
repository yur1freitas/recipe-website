import { cx } from 'tailwind-variants/lite'

export type NavbarBrandProps = React.ComponentProps<'div'>

export function NavbarBrand({
    className,
    children,
    ...props
}: NavbarBrandProps): React.JSX.Element {
    const classNames = cx('navbar-brand', className)

    return (
        <div className={classNames} {...props}>
            {children}
        </div>
    )
}
