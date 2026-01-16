import { cx } from 'tailwind-variants/utils'

export type ErrorProps = React.ComponentProps<'em'>

export function Error({
    className,
    children,
    ...props
}: ErrorProps): React.JSX.Element {
    const classNames = cx('typography-error', className)

    return (
        <em {...props} className={classNames}>
            {children}
        </em>
    )
}
