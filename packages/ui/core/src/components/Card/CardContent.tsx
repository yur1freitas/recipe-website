import { cx } from 'tailwind-variants/utils'

export type CardContentProps = React.ComponentProps<'div'>

export function CardContent({
    className,
    children,
    ...props
}: CardContentProps): React.JSX.Element {
    const classNames = cx('card-content', className)

    return (
        <div className={classNames} {...props}>
            {children}
        </div>
    )
}
