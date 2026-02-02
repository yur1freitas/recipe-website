'use client'

import type { TimeUnit } from '@utils/time'
import type {
    NumberFieldRootChangeEventDetails,
    NumberFieldRootProps
} from '@base-ui/react/number-field'

import { useTimeFieldsetContext } from '~/hooks/useTimeFieldsetContext'

import { NumberField } from '../NumberField'

export type TimeFieldsetInputType = TimeUnit

export interface TimeFieldsetFieldProps extends NumberFieldRootProps {
    type: TimeFieldsetInputType
}

export function TimeFieldsetField({
    type,
    onValueChange,
    allowWheelScrub = true,
    format = { minimumIntegerDigits: 2 },
    ...props
}: TimeFieldsetFieldProps): React.JSX.Element {
    const { min, max, value, setValue } = useTimeFieldsetContext(type)

    const changeValueHandler = (
        value: number | null,
        eventDetails: NumberFieldRootChangeEventDetails
    ) => {
        onValueChange?.(value, eventDetails)
        setValue(value ?? 0)
    }

    return (
        <NumberField.Root
            min={min}
            max={max}
            value={value}
            defaultValue={min}
            onValueChange={changeValueHandler}
            allowWheelScrub={allowWheelScrub}
            format={format}
            {...props}
        />
    )
}
