import { Select as BaseSelect } from '@base-ui/react/select'
import { cx } from 'tailwind-variants/utils'

export type SelectTriggerProps = BaseSelect.Trigger.Props & {
    className?: string
}

export function SelectTrigger({
    className,
    ...props
}: SelectTriggerProps): React.JSX.Element {
    const classNames = cx('select', className)

    return <BaseSelect.Trigger {...props} className={classNames} />
}
