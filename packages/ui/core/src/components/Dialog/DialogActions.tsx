import { cx } from 'tailwind-variants/utils'

export type DialogActionsProps = React.ComponentProps<'div'>

export function DialogActions({
    className,
    ...props
}: DialogActionsProps): React.JSX.Element {
    const classNames = cx('dialog-actions', className)

    return <div {...props} className={classNames} />
}
