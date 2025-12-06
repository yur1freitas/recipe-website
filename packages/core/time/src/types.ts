export type TimeUnit = 'ms' | 'minute' | 'second' | 'hour'

export type TimeInput = Partial<Record<TimeUnit, number>>
