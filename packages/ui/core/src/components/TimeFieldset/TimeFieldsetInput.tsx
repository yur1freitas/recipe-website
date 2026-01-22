import type {
    NumberFieldRootChangeEventDetails,
    NumberFieldRootProps
} from '@base-ui/react/number-field'

import { MinusIcon, PlusIcon } from 'lucide-react'

import type { TimeUnit } from '@utils/time'

import { useTimeFieldsetContext } from '~/hooks/useTimeFieldsetContext'

import { NumberField } from '../NumberField'

export type TimeFieldsetInputType = TimeUnit

export interface TimeFieldsetInputProps extends NumberFieldRootProps {
    type: TimeFieldsetInputType
}

export function TimeFieldsetInput({
    type,
    onValueChange,
    allowWheelScrub = true,
    format = { minimumIntegerDigits: 2 },
    ...props
}: TimeFieldsetInputProps): React.JSX.Element {
    const { label, min, max, value, setValue } = useTimeFieldsetContext(type)

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
                <NumberField.Label className='time-fieldset-label'>
                    {label}:
                </NumberField.Label>
                <NumberField.ScrubAreaCursor />
            </NumberField.ScrubArea>
            <NumberField.Group>
                <NumberField.Decrement>
                    <MinusIcon />
                </NumberField.Decrement>
                <NumberField.Input className='time-fieldset-input' />
                <NumberField.Increment>
                    <PlusIcon />
                </NumberField.Increment>
            </NumberField.Group>
        </NumberField.Root>
    )
}
