import type {
    NumberFieldRootChangeEventDetails,
    NumberFieldRootProps
} from '@base-ui/react/number-field'

import { MinusIcon, PlusIcon } from 'lucide-react'

import type { TimeUnit } from '@utils/time'

import { useTimeFieldContext } from '~/hooks/useTimeFieldContext'

import { NumberField } from '../NumberField'

export type TimeFieldInputType = TimeUnit

export interface TimeFieldInputProps extends NumberFieldRootProps {
    type: TimeFieldInputType
}

export function TimeFieldInput({
    type,
    onValueChange,
    allowWheelScrub = true,
    format = { minimumIntegerDigits: 2 },
    ...props
}: TimeFieldInputProps): React.JSX.Element {
    const { label, min, max, value, setValue } = useTimeFieldContext(type)

    const changeValueHandler = (
        value: number | null,
        eventDetails: NumberFieldRootChangeEventDetails
    ) => {
        onValueChange?.(value, eventDetails)
        setValue(value ?? 0)
    }

    return (
        <NumberField.Root
            {...props}
            min={min}
            max={max}
            value={value}
            defaultValue={min}
            onValueChange={changeValueHandler}
            format={format}
            allowWheelScrub={allowWheelScrub}
        >
            <NumberField.ScrubArea>
                <NumberField.Label className='time-field-label'>
                    {label}:
                </NumberField.Label>
                <NumberField.ScrubAreaCursor />
            </NumberField.ScrubArea>
            <NumberField.Group>
                <NumberField.Decrement>
                    <MinusIcon />
                </NumberField.Decrement>
                <NumberField.Input className='time-field-input' />
                <NumberField.Increment>
                    <PlusIcon />
                </NumberField.Increment>
            </NumberField.Group>
        </NumberField.Root>
    )
}
