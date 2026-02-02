import type { Time, TimeInput } from '@utils/time'

import { useTime } from '~/hooks/useTime'

import { FieldsetRoot } from '../Fieldset/FieldsetRoot'
import { TimeFieldsetContext } from '../../contexts/TimeFieldsetContext'

export interface TimeFieldsetRootProps {
    value?: TimeInput | Time
    onValueChange?: (value: Time) => void
    children?: React.ReactNode
}

export function TimeFieldsetRoot({
    value,
    onValueChange,
    children
}: TimeFieldsetRootProps): React.JSX.Element {
    const { time, setTime, updateTime } = useTime({ value, onValueChange })

    return (
        <TimeFieldsetContext value={{ time, setTime, updateTime }}>
            <FieldsetRoot>{children}</FieldsetRoot>
        </TimeFieldsetContext>
    )
}
