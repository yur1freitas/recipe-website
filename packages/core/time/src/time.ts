import { clamp } from '@utils/core/clamp'

import type { TimeInput, TimeUnit, TimeProps } from './types'

import {
    DEFAULT_TIME,
    MAX_AMOUNT_IN_DAYS,
    MAX_AMOUNT_IN_HOURS,
    MAX_AMOUNT_IN_MINUTES,
    MAX_AMOUNT_IN_MS,
    MAX_AMOUNT_IN_SECONDS,
    MAX_AMOUNT_IN_WEEKS,
    ONE_DAY_IN_MS,
    ONE_HOUR_IN_MS,
    ONE_MINUTE_IN_MS,
    ONE_SECOND_IN_MS,
    ONE_WEEK_IN_MS
} from './constants'

export class Time {
    private $store: Map<TimeUnit, number>

    constructor(input?: TimeInput | Time) {
        this.$store = new Map(DEFAULT_TIME)

        const props = input instanceof Time ? input.props : input

        if (props?.ms) {
            this.addMilliseconds(props.ms)
        }

        if (props?.second) {
            this.addSeconds(props.second)
        }

        if (props?.minute) {
            this.addMinutes(props.minute)
        }

        if (props?.hour) {
            this.addHours(props.hour)
        }

        if (props?.day) {
            this.addDays(props.day)
        }

        if (props?.week) {
            this.addWeeks(props.week)
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

    get days(): number {
        return this.$store.get('day')!
    }

    get weeks(): number {
        return this.$store.get('week')!
    }

    get props(): TimeProps {
        return Object.fromEntries(this.$store.entries()) as TimeProps
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

    static fromDays(days: number): Time {
        return new Time({ day: days })
    }

    static fromWeeks(weeks: number): Time {
        return new Time({ week: weeks })
    }

    setMilliseconds(amount: number) {
        const value = clamp({
            min: 0,
            max: MAX_AMOUNT_IN_MS - 1,
            value: amount
        })

        this.$store.set('ms', value)
        return this
    }

    setSeconds(amount: number) {
        const value = clamp({
            min: 0,
            max: MAX_AMOUNT_IN_SECONDS - 1,
            value: amount
        })

        this.$store.set('second', value)
        return this
    }

    setMinutes(amount: number) {
        const value = clamp({
            min: 0,
            max: MAX_AMOUNT_IN_MINUTES - 1,
            value: amount
        })

        this.$store.set('minute', value)
        return this
    }

    setHours(amount: number) {
        const value = clamp({
            min: 0,
            max: MAX_AMOUNT_IN_HOURS - 1,
            value: amount
        })

        this.$store.set('hour', value)
        return this
    }

    setDays(amount: number) {
        const value = clamp({
            min: 0,
            max: MAX_AMOUNT_IN_DAYS - 1,
            value: amount
        })

        this.$store.set('day', value)
        return this
    }

    setWeeks(amount: number) {
        const value = clamp({
            min: 0,
            max: MAX_AMOUNT_IN_WEEKS - 1,
            value: amount
        })

        this.$store.set('week', value)
        return this
    }

    addMilliseconds(amount: number): this {
        if (amount === 0) return this

        const total = this.ms + amount

        const ms = total % MAX_AMOUNT_IN_MS
        const seconds = Math.floor(total / MAX_AMOUNT_IN_MS)

        this.$store.set('ms', ms)

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
        const days = Math.floor(total / MAX_AMOUNT_IN_HOURS)

        this.$store.set('hour', hours)

        return this.addDays(days)
    }

    addDays(amount: number): this {
        if (amount === 0) return this

        const total = this.days + amount
        const days = total % MAX_AMOUNT_IN_DAYS
        const weeks = Math.floor(total / MAX_AMOUNT_IN_DAYS)

        this.$store.set('day', days)

        return this.addWeeks(weeks)
    }

    addWeeks(amount: number): this {
        if (amount === 0) return this

        const total = this.weeks + amount
        const weeks = total % MAX_AMOUNT_IN_WEEKS

        this.$store.set('week', weeks)

        return this
    }

    toMilliseconds(): number {
        let amount = this.ms

        amount += this.seconds * ONE_SECOND_IN_MS
        amount += this.minutes * ONE_MINUTE_IN_MS
        amount += this.hours * ONE_HOUR_IN_MS
        amount += this.days * ONE_DAY_IN_MS
        amount += this.weeks * ONE_WEEK_IN_MS

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

    toDays(): number {
        return this.toMilliseconds() / ONE_DAY_IN_MS
    }

    toWeeks(): number {
        return this.toMilliseconds() / ONE_WEEK_IN_MS
    }

    toJSON(): number {
        return this.toMilliseconds()
    }

    clone(input?: TimeInput): Time {
        return new Time({ ...this.props, ...input })
    }
}
