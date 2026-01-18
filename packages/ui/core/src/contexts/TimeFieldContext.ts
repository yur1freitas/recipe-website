import { createContext } from 'react'

import type { Time } from '@core/time'

import type { SetTimeFn, UpdateTimeFn } from '~/hooks/useTime'

export interface TimeFieldContextValue {
    time: Time
    setTime: SetTimeFn
    updateTime: UpdateTimeFn
}

export const TimeFieldContext = createContext<TimeFieldContextValue | null>(
    null
)
