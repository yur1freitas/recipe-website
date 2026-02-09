import { cx } from 'tailwind-variants/utils'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'

export type SheetTitleProps = BaseDialog.Title.Props & { className?: string }

export function SheetTitle({
    className,
    ...props
}: SheetTitleProps): React.JSX.Element {
    const classNames = cx('sheet-title', className)

    return <BaseDialog.Title className={classNames} {...props} />
}
