import type { TimeInput } from '@core/time'

import { useState } from 'react'
import { Time } from '@core/time'

import { FieldsetRoot } from '../Fieldset/FieldsetRoot'
import { TimeFieldContext } from '../../contexts/TimeFieldContext'

export interface TimeFieldRootProps extends TimeInput {
    children?: React.ReactNode
}

export function TimeFieldRoot({
    children,
    ...props
}: TimeFieldRootProps): React.JSX.Element {
    const [time, setTime] = useState(new Time(props))

    return (
        <TimeFieldContext value={{ time, setTime }}>
            <FieldsetRoot>{children}</FieldsetRoot>
        </TimeFieldContext>
    )
}
