import { Select as BaseSelect } from '@base-ui/react/select'
import { cx } from 'tailwind-variants/utils'

export type SelectItemProps = BaseSelect.Item.Props & { className?: string }

export function SelectItem({
    className,
    ...props
}: SelectItemProps): React.JSX.Element {
    const classNames = cx('select-item', className)

    return <BaseSelect.Item {...props} className={classNames} />
}
