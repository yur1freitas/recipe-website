import { cx } from 'tailwind-variants/utils'

export type CardHeaderProps = React.ComponentProps<'div'>

export function CardHeader({
    className,
    children,
    ...props
}: CardHeaderProps): React.JSX.Element {
    const classNames = cx('card-header', className)

    return (
        <div className={classNames} {...props}>
            {children}
        </div>
    )
}
