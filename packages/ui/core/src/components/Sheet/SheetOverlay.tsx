import { cx } from 'tailwind-variants/utils'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'

export type SheetOverlayProps = BaseDialog.Backdrop.Props & {
    className?: string
}

export function SheetOverlay({
    className,
    ...props
}: SheetOverlayProps): React.JSX.Element {
    const classNames = cx('sheet-overlay', className)

    return <BaseDialog.Backdrop className={classNames} {...props} />
}
