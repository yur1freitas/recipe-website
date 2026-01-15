import { Field as BaseField } from '@base-ui/react/field'
import { cx } from 'tailwind-variants/utils'

export type FieldErrorProps = BaseField.Error.Props & { className?: string }

export function FieldError({
    className,
    ...props
}: FieldErrorProps): React.JSX.Element {
    const classNames = cx('field-error', className)

    return <BaseField.Error {...props} render={<em />} className={classNames} />
}
