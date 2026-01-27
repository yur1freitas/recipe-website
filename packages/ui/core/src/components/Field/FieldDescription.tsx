import { cx } from 'tailwind-variants/utils'
import { Field as BaseField } from '@base-ui/react/field'

export type FieldDescriptionProps = BaseField.Description.Props & {
    className?: string
}

export function FieldDescription({
    className,
    ...props
}: FieldDescriptionProps): React.JSX.Element {
    const classNames = cx('field-description', className)

    return <BaseField.Description {...props} className={classNames} />
}
