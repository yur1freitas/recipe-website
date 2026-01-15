import { cx } from 'tailwind-variants/utils'

export type H3Props = React.ComponentProps<'h3'>

export function H3({
    className,
    children,
    ...props
}: H3Props): React.JSX.Element {
    const classNames = cx('typography-h3', className)

    return (
        <h3 {...props} className={classNames}>
            {children}
        </h3>
    )
}
