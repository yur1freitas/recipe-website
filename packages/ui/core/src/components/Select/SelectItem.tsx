import { cx } from 'tailwind-variants/utils'
import { Select as BaseSelect } from '@base-ui/react/select'

export type SelectItemProps = BaseSelect.Item.Props & { className?: string }

export function SelectItem({
    className,
    ...props
}: SelectItemProps): React.JSX.Element {
    const classNames = cx('select-item', className)

    return <BaseSelect.Item {...props} className={classNames} />
}
