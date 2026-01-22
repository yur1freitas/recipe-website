import { createContext } from 'react'

import type { Time } from '@utils/time'

import type { SetTimeFn, UpdateTimeFn } from '~/hooks/useTime'

export interface TimeFieldsetContextValue {
    time: Time
    setTime: SetTimeFn
    updateTime: UpdateTimeFn
}

export const TimeFieldsetContext =
    createContext<TimeFieldsetContextValue | null>(null)
