import { cx } from 'tailwind-variants/utils'
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'

export type AlertDialogBackdropProps = BaseAlertDialog.Backdrop.Props & {
    className?: string
}

export function AlertDialogBackdrop({
    className,
    ...props
}: AlertDialogBackdropProps): React.JSX.Element {
    const classNames = cx('alert-dialog-backdrop', className)

    return <BaseAlertDialog.Backdrop className={classNames} {...props} />
}
