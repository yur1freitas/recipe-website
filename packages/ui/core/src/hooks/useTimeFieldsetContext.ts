import type { TimeUnit } from '@utils/time'

import { use } from 'react'
import {
    MAX_AMOUNT_IN_DAYS,
    MAX_AMOUNT_IN_HOURS,
    MAX_AMOUNT_IN_MINUTES,
    MAX_AMOUNT_IN_MS,
    MAX_AMOUNT_IN_SECONDS,
    MAX_AMOUNT_IN_WEEKS
} from '@utils/time'

import { TimeFieldsetContext } from '../contexts/TimeFieldsetContext'

const MAX_AMOUNT_MAPPING: Record<TimeUnit, number> = {
    ms: MAX_AMOUNT_IN_MS,
    second: MAX_AMOUNT_IN_SECONDS,
    minute: MAX_AMOUNT_IN_MINUTES,
    hour: MAX_AMOUNT_IN_HOURS,
    day: MAX_AMOUNT_IN_DAYS,
    week: MAX_AMOUNT_IN_WEEKS
} as const

const LABEL_MAPPING: Record<TimeUnit, string> = {
    ms: 'Milissegundos',
    second: 'Segundos',
    minute: 'Minutos',
    hour: 'Horas',
    day: 'Dias',
    week: 'Semanas'
} as const

export interface UseTimeFieldsetContextReturn {
    label: string
    min: number
    max: number
    value: number
    setValue: (value: number) => void
}

export function useTimeFieldsetContext(
    type: TimeUnit
): UseTimeFieldsetContextReturn {
    const ctx = use(TimeFieldsetContext)

    if (!ctx) {
        throw new Error(
            'O hook useTimeFieldsetContext deve ser usado dentro de <TimeFieldsetRoot>'
        )
    }

    const { time, updateTime } = ctx

    const min = 0
    const max = MAX_AMOUNT_MAPPING[type]
    const label = LABEL_MAPPING[type]
    const value = time.props[type]

    const setValue = (value: number) => {
        updateTime((time) => {
            switch (type) {
                case 'ms': {
                    return time.setMilliseconds(value)
                }
                case 'second': {
                    return time.setSeconds(value)
                }
                case 'minute': {
                    return time.setMinutes(value)
                }
                case 'hour': {
                    return time.setHours(value)
                }
                case 'day': {
                    return time.setDays(value)
                }
                case 'week': {
                    return time.setWeeks(value)
                }
            }
        })
    }

    return { label, min, max, value, setValue }
}
