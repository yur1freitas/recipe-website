import { use } from 'react'

import type { TimeUnit } from '@core/time'

import {
    MAX_AMOUNT_IN_DAYS,
    MAX_AMOUNT_IN_HOURS,
    MAX_AMOUNT_IN_MINUTES,
    MAX_AMOUNT_IN_MS,
    MAX_AMOUNT_IN_SECONDS,
    MAX_AMOUNT_IN_WEEKS
} from '@core/time'

import { TimeFieldContext } from '../contexts/TimeFieldContext'

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

export interface UseTimeFieldContextReturn {
    label: string
    min: number
    max: number
    value: number
    setValue: (value: number) => void
}

export function useTimeFieldContext(type: TimeUnit): UseTimeFieldContextReturn {
    const ctx = use(TimeFieldContext)

    if (!ctx) {
        throw new Error(
            'O hook useTimeFieldContext deve ser usado dentro de <TimeFieldRoot>'
        )
    }

    const { time, setTime } = ctx

    const min = 0
    const max = MAX_AMOUNT_MAPPING[type]
    const label = LABEL_MAPPING[type]
    const value = time.props[type]

    const setValue = (value: number) => {
        setTime((time) => {
            const clonedTime = time.clone()

            switch (type) {
                case 'ms': {
                    clonedTime.setMilliseconds(value)
                    break
                }
                case 'second': {
                    clonedTime.setSeconds(value)
                    break
                }
                case 'minute': {
                    clonedTime.setMinutes(value)
                    break
                }
                case 'hour': {
                    clonedTime.setHours(value)
                    break
                }
                case 'day': {
                    clonedTime.setDays(value)
                    break
                }
                case 'week': {
                    clonedTime.setWeeks(value)
                    break
                }
            }

            return clonedTime
        })
    }

    return { label, min, max, value, setValue }
}
