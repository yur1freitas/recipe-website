import { cx } from 'tailwind-variants/utils'
import { Select as BaseSelect } from '@base-ui/react/select'

export type SelectListProps = BaseSelect.List.Props & { className?: string }

export function SelectList({
    className,
    ...props
}: SelectListProps): React.JSX.Element {
    const classNames = cx('select-list', className)

    return <BaseSelect.List {...props} className={classNames} />
}
