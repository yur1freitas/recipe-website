import type { TimeInput } from '@utils/time'
import { Time } from '@utils/time'
import { useState } from 'react'

export type SetTimeFn = (time: Time) => void
export type UpdateTimeFn = (updater: (time: Time) => Time) => void
export type ChangeValueHandler = (time: Time) => void

export interface UseTimeOutput {
    time: Time
    setTime: SetTimeFn
    updateTime: UpdateTimeFn
}

export interface UseTimeInput extends TimeInput {
    onChangeTime?: ChangeValueHandler
}

export function useTime({
    onChangeTime,
    ...props
}: UseTimeInput = {}): UseTimeOutput {
    const [time, setTimeState] = useState(() => new Time(props))

    const setTime: SetTimeFn = (time) => {
        onChangeTime?.(time)
        setTimeState(time)
    }

    const updateTime: UpdateTimeFn = (updater) => {
        setTimeState((prev) => {
            const updated = updater(prev.clone())
            onChangeTime?.(updated)

            return updated
        })
    }

    return {
        time,
        setTime,
        updateTime
    }
}
