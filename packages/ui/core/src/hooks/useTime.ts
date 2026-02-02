import type { TimeInput } from '@utils/time'

import { useCallback, useState } from 'react'
import { Time } from '@utils/time'

export type SetTimeFn = (time: Time) => void
export type UpdateTimeFn = (updater: (time: Time) => Time) => void
export type ChangeValueHandler = (time: Time) => void

export interface UseTimeOutput {
    time: Time
    setTime: SetTimeFn
    updateTime: UpdateTimeFn
}

export interface UseTimeInput {
    value?: TimeInput | Time
    onValueChange?: ChangeValueHandler
}

export function useTime({
    value,
    onValueChange
}: UseTimeInput = {}): UseTimeOutput {
    const [time, setTimeState] = useState(() => new Time(value))

    const setTime: SetTimeFn = useCallback(
        (time) => {
            onValueChange?.(time)
            setTimeState(time)
        },
        [onValueChange]
    )

    const updateTime: UpdateTimeFn = useCallback(
        (updater) => {
            setTimeState((prev) => {
                const updated = updater(prev.clone())
                onValueChange?.(updated)

                return updated
            })
        },
        [onValueChange]
    )

    return {
        time,
        setTime,
        updateTime
    }
}
