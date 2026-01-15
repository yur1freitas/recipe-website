import { createContext } from 'react'

import type { Time } from '@core/time'

export interface TimeFieldContextValue {
    time: Time
    setTime: React.Dispatch<React.SetStateAction<Time>>
}

export const TimeFieldContext = createContext<TimeFieldContextValue | null>(
    null
)
