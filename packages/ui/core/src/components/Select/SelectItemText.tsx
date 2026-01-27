import { cx } from 'tailwind-variants/utils'
import { Select as BaseSelect } from '@base-ui/react/select'

export type SelectItemTextProps = BaseSelect.ItemText.Props & {
    className?: string
}

export function SelectItemText({
    className,
    ...props
}: SelectItemTextProps): React.JSX.Element {
    const classNames = cx('select-item-text', className)

    return <BaseSelect.ItemText {...props} className={classNames} />
}
