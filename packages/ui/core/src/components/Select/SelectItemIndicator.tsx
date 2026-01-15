import { Select as BaseSelect } from '@base-ui/react/select'

import { cx } from 'tailwind-variants/utils'

export type SelectItemIndicatorProps = BaseSelect.ItemIndicator.Props & {
    className?: string
}

export function SelectItemIndicator({
    className,
    ...props
}: SelectItemIndicatorProps): React.JSX.Element {
    const classNames = cx('select-item-indicator', className)

    return <BaseSelect.ItemIndicator {...props} className={classNames} />
}
