import {
    DEFAULT_TIME,
    MAX_AMOUNT_IN_HOURS,
    MAX_AMOUNT_IN_MINUTES,
    MAX_AMOUNT_IN_MS,
    MAX_AMOUNT_IN_SECONDS,
    ONE_HOUR_IN_MS,
    ONE_MINUTE_IN_MS,
    ONE_SECOND_IN_MS
} from './constants'

import type { TimeInput, TimeUnit } from './types'
import { clamp } from './utils'

export class Time {
    private $store: Map<TimeUnit, number>

    constructor(input?: TimeInput) {
        this.$store = new Map(DEFAULT_TIME)

        if (input?.ms) {
            this.addMilliseconds(input.ms)
        }

        if (input?.second) {
            this.addSeconds(input.second)
        }

        if (input?.minute) {
            this.addMinutes(input.minute)
        }

        if (input?.hour) {
            this.addHours(input.hour)
        }
    }

    get ms(): number {
        return this.$store.get('ms')!
    }

    get seconds(): number {
        return this.$store.get('second')!
    }

    get minutes(): number {
        return this.$store.get('minute')!
    }

    get hours(): number {
        return this.$store.get('hour')!
    }

    static fromMilliseconds(ms: number): Time {
        return new Time({ ms })
    }

    static fromSeconds(seconds: number): Time {
        return new Time({ second: seconds })
    }

    static fromMinutes(minutes: number): Time {
        return new Time({ minute: minutes })
    }

    static fromHours(hours: number): Time {
        return new Time({ hour: hours })
    }

    setMilliseconds(amount: number) {
        const value = clamp(0, MAX_AMOUNT_IN_MS - 1, amount)
        this.$store.set('ms', value)
    }

    setSeconds(amount: number) {
        const value = clamp(0, MAX_AMOUNT_IN_SECONDS - 1, amount)
        this.$store.set('second', value)
    }

    setMinutes(amount: number) {
        const value = clamp(0, MAX_AMOUNT_IN_MINUTES - 1, amount)
        this.$store.set('minute', value)
    }

    setHours(amount: number) {
        const value = clamp(0, MAX_AMOUNT_IN_HOURS - 1, amount)
        this.$store.set('hour', value)
    }

    addMilliseconds(amount: number): this {
        if (amount === 0) return this

        const total = this.ms + amount

        const ms = total % MAX_AMOUNT_IN_MS
        const seconds = Math.floor(total / MAX_AMOUNT_IN_MS)

        this.setMilliseconds(ms)

        return this.addSeconds(seconds)
    }

    addSeconds(amount: number): this {
        if (amount === 0) return this

        const total = this.seconds + amount

        const seconds = total % MAX_AMOUNT_IN_SECONDS
        const minutes = Math.floor(total / MAX_AMOUNT_IN_SECONDS)

        this.$store.set('second', seconds)

        return this.addMinutes(minutes)
    }

    addMinutes(amount: number): this {
        if (amount === 0) return this

        const total = this.minutes + amount

        const minutes = total % MAX_AMOUNT_IN_MINUTES
        const hours = Math.floor(total / MAX_AMOUNT_IN_MINUTES)

        this.$store.set('minute', minutes)

        return this.addHours(hours)
    }

    addHours(amount: number): this {
        if (amount === 0) return this

        const total = this.hours + amount
        const hours = total % MAX_AMOUNT_IN_HOURS

        this.$store.set('hour', hours)

        return this
    }

    toMilliseconds(): number {
        let amount = this.ms

        amount += this.seconds * ONE_SECOND_IN_MS
        amount += this.minutes * ONE_MINUTE_IN_MS
        amount += this.hours * ONE_HOUR_IN_MS

        return amount
    }

    toSeconds(): number {
        return this.toMilliseconds() / ONE_SECOND_IN_MS
    }

    toMinutes(): number {
        return this.toMilliseconds() / ONE_MINUTE_IN_MS
    }

    toHours(): number {
        return this.toMilliseconds() / ONE_HOUR_IN_MS
    }

    toJSON(): number {
        return this.toMilliseconds()
    }
}
