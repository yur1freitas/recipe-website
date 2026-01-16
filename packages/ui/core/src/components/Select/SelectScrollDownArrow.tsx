import { Select as BaseSelect } from '@base-ui/react/select'
import { cx } from 'tailwind-variants/utils'

export type SelectScrollDownArrowProps = BaseSelect.ScrollDownArrow.Props & {
    className?: string
}

export function SelectScrollDownArrow({
    className,
    ...props
}: SelectScrollDownArrowProps): React.JSX.Element {
    const classNames = cx('select-arrow', className)

    return <BaseSelect.ScrollDownArrow {...props} className={classNames} />
}
