import { cx } from 'tailwind-variants/utils'
import { NumberField as BaseNumberField } from '@base-ui/react/number-field'

export type NumberFieldScrubAreaProps = BaseNumberField.ScrubArea.Props & {
    className?: string
}

export function NumberFieldScrubArea({
    className,
    ...props
}: NumberFieldScrubAreaProps): React.JSX.Element {
    const classNames = cx('number-field-scrub-area', className)

    return <BaseNumberField.ScrubArea {...props} className={classNames} />
}
