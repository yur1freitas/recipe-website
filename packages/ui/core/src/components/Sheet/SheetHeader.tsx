import { cx } from 'tailwind-variants/utils'

export type SheetHeaderProps = React.ComponentProps<'div'>

export function SheetHeader({
    className,
    ...props
}: SheetHeaderProps): React.JSX.Element {
    const classNames = cx('sheet-header', className)

    return <div className={classNames} {...props} />
}
