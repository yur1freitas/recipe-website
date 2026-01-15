import { Field as BaseField } from '@base-ui/react/field'
import { cx } from 'tailwind-variants/utils'

export type FieldLabelProps = BaseField.Label.Props & { className?: string }

export function FieldLabel({
    className,
    ...props
}: FieldLabelProps): React.JSX.Element {
    const classNames = cx('field-label', className)

    return <BaseField.Label {...props} className={classNames} />
}
