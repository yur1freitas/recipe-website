import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { cx } from 'tailwind-variants/utils'

export type NumberFieldDecrementProps = BaseNumberField.Decrement.Props & {
    className?: string
}

export function NumberFieldDecrement({
    className,
    ...props
}: NumberFieldDecrementProps): React.JSX.Element {
    const classNames = cx('number-field-decrement', className)

    return <BaseNumberField.Decrement {...props} className={classNames} />
}
