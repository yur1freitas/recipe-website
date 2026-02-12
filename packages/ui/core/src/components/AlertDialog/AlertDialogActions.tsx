import { cx } from 'tailwind-variants/utils'

export type AlertDialogActionsProps = React.ComponentProps<'div'>

export function AlertDialogActions({
    className,
    ...props
}: AlertDialogActionsProps): React.JSX.Element {
    const classNames = cx('alert-dialog-actions', className)

    return <div className={classNames} {...props} />
}
