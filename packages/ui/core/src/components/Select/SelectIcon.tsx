import { cx } from 'tailwind-variants/utils'
import { ChevronDownIcon } from 'lucide-react'
import { Select as BaseSelect } from '@base-ui/react/select'

export type SelectIconProps = BaseSelect.Icon.Props & { className?: string }

export function SelectIcon({
    className,
    children,
    ...props
}: SelectIconProps): React.JSX.Element {
    const classNames = cx('select-icon', className)

    return (
        <BaseSelect.Icon {...props} className={classNames}>
            {children ?? <ChevronDownIcon focusable={false} />}
        </BaseSelect.Icon>
    )
}
