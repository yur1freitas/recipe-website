import { cx } from 'tailwind-variants/utils'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'

export type NumberFieldIncrementProps = BaseNumberField.Increment.Props & {
    className?: string
}

export function NumberFieldIncrement({
    className,
    ...props
}: NumberFieldIncrementProps): React.JSX.Element {
    const classNames = cx('number-field-increment', className)

    return <BaseNumberField.Increment {...props} className={classNames} />
}
