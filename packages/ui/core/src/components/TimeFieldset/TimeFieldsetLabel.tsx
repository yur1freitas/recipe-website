import { cx } from 'tailwind-variants/utils'

import type { NumberFieldProps } from '../NumberField'

import { NumberField } from '../NumberField'

export type TimeFieldsetLabelProps = NumberFieldProps.Label

export function TimeFieldsetLabel({
    className,
    ...props
}: TimeFieldsetLabelProps) {
    const classNames = cx('time-fieldset-label', className)

    return (
        <NumberField.ScrubArea>
            <NumberField.Label className={classNames} {...props} />
            <NumberField.ScrubAreaCursor />
        </NumberField.ScrubArea>
    )
}
