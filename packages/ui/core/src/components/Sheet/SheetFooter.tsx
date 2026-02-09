import { cx } from 'tailwind-variants/utils'

export type SheetFooterProps = React.ComponentProps<'div'>

export function SheetFooter({
    className,
    ...props
}: SheetFooterProps): React.JSX.Element {
    const classNames = cx('sheet-footer', className)

    return <div className={classNames} {...props} />
}
