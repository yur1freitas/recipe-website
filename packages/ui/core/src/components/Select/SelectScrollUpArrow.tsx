import { Select as BaseSelect } from '@base-ui/react/select'

import { cx } from 'tailwind-variants/utils'

export type SelectScrollUpArrowProps = BaseSelect.ScrollUpArrow.Props & {
    className?: string
}

export function SelectScrollUpArrow({
    className,
    ...props
}: SelectScrollUpArrowProps): React.JSX.Element {
    const classNames = cx('select-arrow', className)

    return <BaseSelect.ScrollUpArrow {...props} className={classNames} />
}
