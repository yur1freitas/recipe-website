import { TimeFieldsetContext } from '../../contexts/TimeFieldsetContext'
import { FieldsetRoot } from '../Fieldset/FieldsetRoot'
import type { UseTimeInput } from '~/hooks/useTime'
import { useTime } from '~/hooks/useTime'

export interface TimeFieldsetRootProps extends UseTimeInput {
    children?: React.ReactNode
}

export function TimeFieldsetRoot({
    children,
    ...props
}: TimeFieldsetRootProps): React.JSX.Element {
    const { time, setTime, updateTime } = useTime(props)

    return (
        <TimeFieldsetContext value={{ time, setTime, updateTime }}>
            <FieldsetRoot>{children}</FieldsetRoot>
        </TimeFieldsetContext>
    )
}
