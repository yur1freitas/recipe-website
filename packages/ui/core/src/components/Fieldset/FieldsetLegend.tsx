import { cx } from 'tailwind-variants/utils'
import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset'

export type FieldsetLegendProps = BaseFieldset.Legend.Props & {
    className?: string
}

export function FieldsetLegend({
    className,
    ...props
}: FieldsetLegendProps): React.JSX.Element {
    const classNames = cx('fieldset-legend', className)

    return <BaseFieldset.Legend {...props} className={classNames} />
}
