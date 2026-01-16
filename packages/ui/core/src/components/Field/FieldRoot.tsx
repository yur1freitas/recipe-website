import { Field as BaseField } from '@base-ui/react/field'
import { cx } from 'tailwind-variants/utils'

export type FieldRootProps = BaseField.Root.Props & { className?: string }

export function FieldRoot({
    className,
    ...props
}: FieldRootProps): React.JSX.Element {
    const classNames = cx('field', className)

    return <BaseField.Root {...props} className={classNames} />
}
