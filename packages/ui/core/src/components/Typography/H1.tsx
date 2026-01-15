import { cx } from 'tailwind-variants/utils'

export type H1Props = React.ComponentProps<'h1'>

export function H1({
    className,
    children,
    ...props
}: H1Props): React.JSX.Element {
    const classNames = cx('typography-h1', className)

    return (
        <h1 {...props} className={classNames}>
            {children}
        </h1>
    )
}
