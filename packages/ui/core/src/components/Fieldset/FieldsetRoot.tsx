import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'
import { cx } from 'tailwind-variants/utils'

export type FieldsetRootProps = BaseFieldset.Root.Props & {
    className?: string
}

export function FieldsetRoot({
    className,
    ...props
}: FieldsetRootProps): React.JSX.Element {
    const classNames = cx('fieldset', className)

    return <BaseFieldset.Root {...props} className={classNames} />
}
