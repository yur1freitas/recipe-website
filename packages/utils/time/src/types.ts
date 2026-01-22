export type TimeUnit = 'ms' | 'minute' | 'second' | 'hour' | 'day' | 'week'

export type TimeInput = Partial<Record<TimeUnit, number>>

export type TimeProps = Required<TimeInput>
