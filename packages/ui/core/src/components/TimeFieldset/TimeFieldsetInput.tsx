import { MinusIcon, PlusIcon } from 'lucide-react'
import { cx } from 'tailwind-variants/utils'

import type { NumberFieldInputProps } from '../NumberField/NumberFieldInput'

import { NumberFieldIncrement } from '../NumberField/NumberFieldIncrement'
import { NumberFieldInput } from '../NumberField/NumberFieldInput'
import { NumberFieldDecrement } from '../NumberField/NumberFieldDecrement'
import { NumberFieldGroup } from '../NumberField/NumberFieldGroup'

export type TimeFieldsetInputProps = NumberFieldInputProps

export function TimeFieldsetInput({
    className,
    ...props
}: TimeFieldsetInputProps) {
    const classNames = cx('time-fieldset-input', className)

    return (
        <NumberFieldGroup>
            <NumberFieldDecrement>
                <MinusIcon />
            </NumberFieldDecrement>
            <NumberFieldInput className={classNames} {...props} />
            <NumberFieldIncrement>
                <PlusIcon />
            </NumberFieldIncrement>
        </NumberFieldGroup>
    )
}
