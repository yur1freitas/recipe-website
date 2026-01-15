import { Field as BaseField } from '@base-ui/react/field'
import { cx } from 'tailwind-variants/utils'

export type FieldControlProps = BaseField.Control.Props & { className?: string }

export function FieldControl({
    className,
    ...props
}: FieldControlProps): React.JSX.Element {
    const classNames = cx('field-control', className)

    return <BaseField.Control {...props} className={classNames} />
}
