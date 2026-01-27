import { cx } from 'tailwind-variants/utils'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'

export type DialogBackdropProps = BaseDialog.Backdrop.Props & {
    className?: string
}

export function DialogBackdrop({
    className,
    ...props
}: DialogBackdropProps): React.JSX.Element {
    const classNames = cx('dialog-backdrop', className)

    return <BaseDialog.Backdrop {...props} className={classNames} />
}
