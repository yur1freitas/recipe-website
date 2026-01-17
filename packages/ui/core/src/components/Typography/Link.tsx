import { cx } from 'tailwind-variants/utils'

export type LinkProps = React.ComponentProps<'a'>

export function Link({
    className,
    children,
    ...props
}: LinkProps): React.JSX.Element {
    const classNames = cx('typography-link', className)

    return (
        <a className={classNames} {...props}>
            {children}
        </a>
    )
}
