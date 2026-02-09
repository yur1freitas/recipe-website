import { cx } from 'tailwind-variants/utils'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'

export type SheetDescriptionProps = BaseDialog.Description.Props & {
    className?: string
}

export function SheetDescription({
    className,
    ...props
}: SheetDescriptionProps): React.JSX.Element {
    const classNames = cx('sheet-description', className)

    return <BaseDialog.Description className={classNames} {...props} />
}
