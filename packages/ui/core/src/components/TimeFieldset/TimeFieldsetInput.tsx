'use client'

import { cx } from 'tailwind-variants/utils'
import { MinusIcon, PlusIcon } from 'lucide-react'

import type { NumberFieldInputProps } from '../NumberField/NumberFieldInput'

import { NumberFieldInput } from '../NumberField/NumberFieldInput'
import { NumberFieldIncrement } from '../NumberField/NumberFieldIncrement'
import { NumberFieldGroup } from '../NumberField/NumberFieldGroup'
import { NumberFieldDecrement } from '../NumberField/NumberFieldDecrement'

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
