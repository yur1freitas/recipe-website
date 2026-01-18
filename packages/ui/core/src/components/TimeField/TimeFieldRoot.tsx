import { TimeFieldContext } from '../../contexts/TimeFieldContext'
import { FieldsetRoot } from '../Fieldset/FieldsetRoot'
import type { UseTimeInput } from '~/hooks/useTime'
import { useTime } from '~/hooks/useTime'

export interface TimeFieldRootProps extends UseTimeInput {
    children?: React.ReactNode
}

export function TimeFieldRoot({
    children,
    ...props
}: TimeFieldRootProps): React.JSX.Element {
    const { time, setTime, updateTime } = useTime(props)

    return (
        <TimeFieldContext value={{ time, setTime, updateTime }}>
            <FieldsetRoot>{children}</FieldsetRoot>
        </TimeFieldContext>
    )
}
