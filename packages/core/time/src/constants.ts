import type { TimeUnit } from './types'

export const ONE_HOUR_IN_MS = 3.6e6
export const ONE_MINUTE_IN_MS = 6e4
export const ONE_SECOND_IN_MS = 1e3

export const MAX_AMOUNT_IN_HOURS = 24
export const MAX_AMOUNT_IN_MINUTES = 60
export const MAX_AMOUNT_IN_SECONDS = 60
export const MAX_AMOUNT_IN_MS = 1_000

export const DEFAULT_TIME: [TimeUnit, number][] = [
    ['ms', 0],
    ['second', 0],
    ['minute', 0],
    ['hour', 0]
]
