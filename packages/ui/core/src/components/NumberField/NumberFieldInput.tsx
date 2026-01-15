import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { cx } from 'tailwind-variants/utils'

export type NumberFieldInputProps = BaseNumberField.Input.Props & {
    className?: string
}

export function NumberFieldInput({
    className,
    ...props
}: NumberFieldInputProps): React.JSX.Element {
    const classNames = cx('number-field-input', className)

    return <BaseNumberField.Input {...props} className={classNames} />
}
