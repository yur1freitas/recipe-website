import { cx } from 'tailwind-variants/utils'

export type H2Props = React.ComponentProps<'h2'>

export function H2({
    className,
    children,
    ...props
}: H2Props): React.JSX.Element {
    const classNames = cx('typography-h2', className)

    return (
        <h2 {...props} className={classNames}>
            {children}
        </h2>
    )
}
