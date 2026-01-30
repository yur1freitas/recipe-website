import { cx } from 'tailwind-variants/utils'

export type CardActionProps = React.ComponentProps<'div'>

export function CardAction({
    className,
    children,
    ...props
}: CardActionProps): React.JSX.Element {
    const classNames = cx('card-action', className)

    return (
        <div className={classNames} {...props}>
            {children}
        </div>
    )
}
