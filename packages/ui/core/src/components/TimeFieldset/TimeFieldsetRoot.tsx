import type { Time, TimeInput } from '@utils/time'
import { TimeFieldsetContext } from '../../contexts/TimeFieldsetContext'
import { FieldsetRoot } from '../Fieldset/FieldsetRoot'

import { useTime } from '~/hooks/useTime'

export interface TimeFieldsetRootProps {
    value?: TimeInput | Time
    children?: React.ReactNode
}

export function TimeFieldsetRoot({
    value,
    children
}: TimeFieldsetRootProps): React.JSX.Element {
    const { time, setTime, updateTime } = useTime({ value })

    return (
        <TimeFieldsetContext value={{ time, setTime, updateTime }}>
            <FieldsetRoot>{children}</FieldsetRoot>
        </TimeFieldsetContext>
    )
}
