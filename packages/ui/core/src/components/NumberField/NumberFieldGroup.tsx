import { cx } from 'tailwind-variants/utils'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'

export type NumberFieldGroupProps = BaseNumberField.Group.Props & {
    className?: string
}

export function NumberFieldGroup({
    className,
    ...props
}: NumberFieldGroupProps): React.JSX.Element {
    const classNames = cx('number-field-group', className)

    return <BaseNumberField.Group {...props} className={classNames} />
}
