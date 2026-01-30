import { cx } from 'tailwind-variants/utils'

export type CardFooterProps = React.ComponentProps<'div'>

export function CardFooter({
    className,
    children,
    ...props
}: CardFooterProps): React.JSX.Element {
    const classNames = cx('card-footer', className)

    return (
        <div className={classNames} {...props}>
            {children}
        </div>
    )
}
