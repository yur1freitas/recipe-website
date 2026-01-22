import { faker } from '@faker-js/faker/locale/pt_BR'
import { describe, it, expect, vi } from 'vitest'

import { randMilliseconds } from '~mocks/randMilliseconds'
import { randSeconds } from '~mocks/randSeconds'
import { randMinutes } from '~mocks/randMinutes'
import { randWeeks } from '~mocks/randWeeks'
import { randHours } from '~mocks/randHours'
import { randTime } from '~mocks/randTime'
import { randDays } from '~mocks/randDays'

import type { TimeUnit } from '~/types'

import {
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
} from '~/constants'
import { Time } from '~/time'

describe('Time', () => {
    const NUM_DIGITS = 2

    it('deve instanciar uma classe Time', () => {
        const input = randTime()
        const time = new Time(input)

        expect(time.ms).toBe(input.ms)
        expect(time.seconds).toBe(input.second)
        expect(time.minutes).toBe(input.minute)
        expect(time.hours).toBe(input.hour)
        expect(time.props).toEqual(input)
    })

    it('deve instanciar uma classe Time a partir de outro Time', () => {
        const input = randTime()
        const time = new Time(input)
        const otherTime = new Time(time)

        expect(time.props).toStrictEqual(otherTime.props)
    })

    it('deve instanciar uma classe Time a partir de um valor em milissegundos', () => {
        const input = randMilliseconds()
        const time = Time.fromMilliseconds(input)

        expect(time.ms).toBe(input)
    })

    it('deve instanciar uma classe Time a partir de um valor em segundos', () => {
        const input = randSeconds()
        const time = Time.fromSeconds(input)

        expect(time.seconds).toBe(input)
    })

    it('deve instanciar uma classe Time a partir de um valor em minutos', () => {
        const input = randMinutes()
        const time = Time.fromMinutes(input)

        expect(time.minutes).toBe(input)
    })

    it('deve instanciar uma classe Time a partir de um valor em horas', () => {
        const input = randHours()
        const time = Time.fromHours(input)

        expect(time.hours).toBe(input)
    })

    it('deve instanciar uma classe Time a partir de um valor em dias', () => {
        const input = randDays()
        const time = Time.fromDays(input)

        expect(time.days).toBe(input)
    })

    it('deve instanciar uma classe Time a partir de um valor em semanas', () => {
        const input = randWeeks()
        const time = Time.fromWeeks(input)

        expect(time.weeks).toBe(input)
    })

    it('deve adicionar milissegundos', () => {
        const input = randTime({ ms: 0 })
        const time = new Time(input)

        const ms = randMilliseconds()

        expect(time.addMilliseconds(ms).ms).toBe(ms)
    })

    it('deve interromper a chamada ao adicionar 0 milissegundos', () => {
        const ms = 0
        const time = new Time()

        const mock = vi.spyOn(time, 'addSeconds')

        time.addMilliseconds(ms)

        expect(mock).not.toHaveBeenCalled()

        mock.mockRestore()
    })

    it('deve adicionar segundos', () => {
        const input = randTime({ second: 0 })
        const time = new Time(input)

        const seconds = randSeconds()

        expect(time.addSeconds(seconds).seconds).toBe(seconds)
    })

    it('deve interromper a chamada ao adicionar 0 segundos', () => {
        const seconds = 0
        const time = new Time()

        const mock = vi.spyOn(time, 'addMinutes')

        time.addSeconds(seconds)

        expect(mock).not.toHaveBeenCalled()

        mock.mockRestore()
    })

    it('deve adicionar minutos', () => {
        const input = randTime({ minute: 0 })
        const time = new Time(input)

        const minutes = randMinutes()

        expect(time.addMinutes(minutes).minutes).toBe(minutes)
    })

    it('deve interromper a chamada ao adicionar 0 minutos', () => {
        const minutes = 0
        const time = new Time()

        const mock = vi.spyOn(time, 'addHours')

        time.addMinutes(minutes)

        expect(mock).not.toHaveBeenCalled()

        mock.mockRestore()
    })

    it('deve adicionar horas', () => {
        const input = randTime({ hour: 0 })
        const time = new Time(input)

        const hours = randHours()

        expect(time.addHours(hours).hours).toBe(hours)
    })

    it('deve interromper a chamada ao adicionar 0 horas', () => {
        const hours = 0
        const time = new Time()

        const mock = vi.spyOn(time, 'addDays')

        time.addHours(hours)

        expect(mock).not.toHaveBeenCalled()

        mock.mockRestore()
    })

    it('deve adicionar dias', () => {
        const input = randTime({ day: 0 })
        const time = new Time(input)

        const days = randDays()

        expect(time.addDays(days).days).toBe(days)
    })

    it('deve interromper a chamada ao adicionar 0 dias', () => {
        const days = 0
        const time = new Time()

        const mock = vi.spyOn(time, 'addWeeks')

        time.addDays(days)

        expect(mock).not.toHaveBeenCalled()

        mock.mockRestore()
    })

    it('deve adicionar semanas', () => {
        const input = randTime({ week: 0 })
        const time = new Time(input)

        const weeks = randWeeks()

        expect(time.addWeeks(weeks).weeks).toBe(weeks)
    })

    it('deve acrescentar aos segundos se os milissegundos ultrapassarem o limite', () => {
        const ms = faker.number.int({
            min: MAX_AMOUNT_IN_MS,
            max: MAX_AMOUNT_IN_MS * MAX_AMOUNT_IN_SECONDS
        })
        const time = new Time({ ms })

        expect(time.ms).toBeLessThan(MAX_AMOUNT_IN_MS)
        expect(time.seconds).toBeGreaterThan(0)
    })

    it('deve acrescentar aos minutos se os segundos ultrapassarem o limite', () => {
        const second = faker.number.int({
            min: MAX_AMOUNT_IN_SECONDS,
            max: MAX_AMOUNT_IN_SECONDS * MAX_AMOUNT_IN_MINUTES
        })
        const time = new Time({ second })

        expect(time.seconds).toBeLessThan(MAX_AMOUNT_IN_SECONDS)
        expect(time.minutes).toBeGreaterThan(0)
    })

    it('deve acrescentar aos dias se as horas ultrapassarem o limite', () => {
        const hour = faker.number.int({
            min: MAX_AMOUNT_IN_HOURS,
            max: MAX_AMOUNT_IN_HOURS * MAX_AMOUNT_IN_DAYS
        })

        const time = new Time({ hour })

        expect(time.hours).toBeLessThan(MAX_AMOUNT_IN_HOURS)
        expect(time.days).toBeGreaterThan(0)
    })

    it('deve acrescentar às semanas se os dias ultrapassarem o limite', () => {
        const day = faker.number.int({
            min: MAX_AMOUNT_IN_DAYS,
            max: MAX_AMOUNT_IN_DAYS * MAX_AMOUNT_IN_WEEKS
        })

        const time = new Time({ day })

        expect(time.days).toBeLessThan(MAX_AMOUNT_IN_DAYS)
        expect(time.weeks).toBeGreaterThan(0)
    })

    it('deve definir os milissegundos', () => {
        const ms = randMilliseconds()
        const time = new Time()

        time.setMilliseconds(ms)

        expect(time.ms).toBe(ms)
    })

    it('deve limitar os milissegundos ao defini-lo', () => {
        const ms = faker.number.int({ min: MAX_AMOUNT_IN_MS })
        const time = new Time()

        time.setMilliseconds(ms)

        expect(time.ms).toBe(MAX_AMOUNT_IN_MS - 1)
    })

    it('deve definir os segundos', () => {
        const seconds = randSeconds()
        const time = new Time()

        time.setSeconds(seconds)

        expect(time.seconds).toBe(seconds)
    })

    it('deve limitar os segundos ao defini-lo', () => {
        const seconds = faker.number.int({ min: MAX_AMOUNT_IN_SECONDS })
        const time = new Time()

        time.setSeconds(seconds)

        expect(time.seconds).toBe(MAX_AMOUNT_IN_SECONDS - 1)
    })

    it('deve definir os minutos', () => {
        const minutes = randMinutes()
        const time = new Time()

        time.setMinutes(minutes)

        expect(time.minutes).toBe(minutes)
    })

    it('deve limitar os minutos ao defini-lo', () => {
        const minutes = faker.number.int({ min: MAX_AMOUNT_IN_MINUTES })
        const time = new Time()

        time.setMinutes(minutes)

        expect(time.minutes).toBe(MAX_AMOUNT_IN_MINUTES - 1)
    })

    it('deve definir as horas', () => {
        const hours = randHours()
        const time = new Time()

        time.setHours(hours)

        expect(time.hours).toBe(hours)
    })

    it('deve limitar as horas ao defini-la', () => {
        const hours = faker.number.int({ min: MAX_AMOUNT_IN_HOURS })
        const time = new Time()

        time.setHours(hours)

        expect(time.hours).toBe(MAX_AMOUNT_IN_HOURS - 1)
    })

    it('deve definir os dias', () => {
        const days = randDays()
        const time = new Time()

        time.setDays(days)

        expect(time.days).toBe(days)
    })

    it('deve limitar os dias ao defini-lo', () => {
        const days = faker.number.int({ min: MAX_AMOUNT_IN_DAYS })
        const time = new Time()

        time.setDays(days)

        expect(time.days).toBe(MAX_AMOUNT_IN_DAYS - 1)
    })

    it('deve definir as semanas', () => {
        const weeks = randWeeks()
        const time = new Time()

        time.setWeeks(weeks)

        expect(time.weeks).toBe(weeks)
    })

    it('deve limitar as semanas ao defini-la', () => {
        const weeks = faker.number.int({ min: MAX_AMOUNT_IN_WEEKS })
        const time = new Time()

        time.setWeeks(weeks)

        expect(time.weeks).toBe(MAX_AMOUNT_IN_WEEKS - 1)
    })

    it('deve converter o tempo para milissegundos', () => {
        const { ms, second, minute, hour, day, week } = randTime()

        let acc = ms

        const time = new Time({ ms })

        expect(time.toMilliseconds()).toBe(acc)

        time.addSeconds(second)
        acc += second * ONE_SECOND_IN_MS

        expect(time.toMilliseconds()).toBe(acc)

        time.addMinutes(minute)
        acc += minute * ONE_MINUTE_IN_MS

        expect(time.toMilliseconds()).toBe(acc)

        time.addHours(hour)
        acc += hour * ONE_HOUR_IN_MS

        expect(time.toMilliseconds()).toBe(acc)

        time.addDays(day)
        acc += day * ONE_DAY_IN_MS

        expect(time.toMilliseconds()).toBe(acc)

        time.addWeeks(week)
        acc += week * ONE_WEEK_IN_MS

        expect(time.toMilliseconds()).toBe(acc)

        expect(
            new Time({ ms, second, minute, hour, day, week }).toMilliseconds()
        ).toBe(acc)
    })

    it('deve converter o tempo para segundos', () => {
        const { ms, second, minute, hour, day, week } = randTime()

        let acc = ms / ONE_SECOND_IN_MS

        const time = new Time({ ms })

        expect(time.toSeconds()).toBeCloseTo(acc, NUM_DIGITS)

        time.addSeconds(second)
        acc += second

        expect(time.toSeconds()).toBeCloseTo(acc, NUM_DIGITS)

        time.addMinutes(minute)
        acc += (minute * ONE_MINUTE_IN_MS) / ONE_SECOND_IN_MS

        expect(time.toSeconds()).toBeCloseTo(acc, NUM_DIGITS)

        time.addHours(hour)
        acc += (hour * ONE_HOUR_IN_MS) / ONE_SECOND_IN_MS

        expect(time.toSeconds()).toBeCloseTo(acc, NUM_DIGITS)

        time.addDays(day)
        acc += (day * ONE_DAY_IN_MS) / ONE_SECOND_IN_MS

        expect(time.toSeconds()).toBeCloseTo(acc, NUM_DIGITS)

        time.addWeeks(week)
        acc += (week * ONE_WEEK_IN_MS) / ONE_SECOND_IN_MS

        expect(time.toSeconds()).toBeCloseTo(acc, NUM_DIGITS)

        expect(
            new Time({ ms, second, minute, hour, day, week }).toSeconds()
        ).toBeCloseTo(acc, NUM_DIGITS)
    })

    it('deve converter o tempo para minutos', () => {
        const { ms, second, minute, hour, day, week } = randTime()

        let acc = ms / ONE_MINUTE_IN_MS

        const time = new Time({ ms })

        expect(time.toMinutes()).toBeCloseTo(acc, NUM_DIGITS)

        time.addSeconds(second)
        acc += (second * ONE_SECOND_IN_MS) / ONE_MINUTE_IN_MS

        expect(time.toMinutes()).toBeCloseTo(acc, NUM_DIGITS)

        time.addMinutes(minute)
        acc += minute

        expect(time.toMinutes()).toBeCloseTo(acc, NUM_DIGITS)

        time.addHours(hour)
        acc += (hour * ONE_HOUR_IN_MS) / ONE_MINUTE_IN_MS

        expect(time.toMinutes()).toBeCloseTo(acc, NUM_DIGITS)

        time.addDays(day)
        acc += (day * ONE_DAY_IN_MS) / ONE_MINUTE_IN_MS

        expect(time.toMinutes()).toBeCloseTo(acc, NUM_DIGITS)

        time.addWeeks(week)
        acc += (week * ONE_WEEK_IN_MS) / ONE_MINUTE_IN_MS

        expect(time.toMinutes()).toBeCloseTo(acc, NUM_DIGITS)

        expect(
            new Time({ ms, second, minute, hour, day, week }).toMinutes()
        ).toBeCloseTo(acc, NUM_DIGITS)
    })

    it('deve converter o tempo para horas', () => {
        const { ms, second, minute, hour, day, week } = randTime()

        let acc = ms / ONE_HOUR_IN_MS

        const time = new Time({ ms })

        expect(time.toHours()).toBeCloseTo(acc, NUM_DIGITS)

        time.addSeconds(second)
        acc += (second * ONE_SECOND_IN_MS) / ONE_HOUR_IN_MS

        expect(time.toHours()).toBeCloseTo(acc, NUM_DIGITS)

        time.addMinutes(minute)
        acc += (minute * ONE_MINUTE_IN_MS) / ONE_HOUR_IN_MS

        expect(time.toHours()).toBeCloseTo(acc, NUM_DIGITS)

        time.addHours(hour)
        acc += hour

        expect(time.toHours()).toBeCloseTo(acc, NUM_DIGITS)

        time.addDays(day)
        acc += (day * ONE_DAY_IN_MS) / ONE_HOUR_IN_MS

        expect(time.toHours()).toBeCloseTo(acc, NUM_DIGITS)

        time.addWeeks(week)
        acc += (week * ONE_WEEK_IN_MS) / ONE_HOUR_IN_MS

        expect(time.toHours()).toBeCloseTo(acc, NUM_DIGITS)

        expect(
            new Time({ ms, second, minute, hour, day, week }).toHours()
        ).toBeCloseTo(acc, NUM_DIGITS)
    })

    it('deve converter o tempo para dias', () => {
        const { ms, second, minute, hour, day, week } = randTime()

        let acc = ms / ONE_DAY_IN_MS

        const time = new Time({ ms })

        expect(time.toDays()).toBeCloseTo(acc, NUM_DIGITS)

        time.addSeconds(second)
        acc += (second * ONE_SECOND_IN_MS) / ONE_DAY_IN_MS

        expect(time.toDays()).toBeCloseTo(acc, NUM_DIGITS)

        time.addMinutes(minute)
        acc += (minute * ONE_MINUTE_IN_MS) / ONE_DAY_IN_MS

        expect(time.toDays()).toBeCloseTo(acc, NUM_DIGITS)

        time.addHours(hour)
        acc += (hour * ONE_HOUR_IN_MS) / ONE_DAY_IN_MS

        expect(time.toDays()).toBeCloseTo(acc, NUM_DIGITS)

        time.addDays(day)
        acc += day

        expect(time.toDays()).toBeCloseTo(acc, NUM_DIGITS)

        time.addWeeks(week)
        acc += (week * ONE_WEEK_IN_MS) / ONE_DAY_IN_MS

        expect(time.toDays()).toBeCloseTo(acc, NUM_DIGITS)

        expect(
            new Time({ ms, second, minute, hour, day, week }).toDays()
        ).toBeCloseTo(acc, NUM_DIGITS)
    })

    it('deve converter o tempo para semanas', () => {
        const { ms, second, minute, hour, day, week } = randTime()

        let acc = ms / ONE_WEEK_IN_MS

        const time = new Time({ ms })

        expect(time.toWeeks()).toBeCloseTo(acc, NUM_DIGITS)

        time.addSeconds(second)
        acc += (second * ONE_SECOND_IN_MS) / ONE_WEEK_IN_MS

        expect(time.toWeeks()).toBeCloseTo(acc, NUM_DIGITS)

        time.addMinutes(minute)
        acc += (minute * ONE_MINUTE_IN_MS) / ONE_WEEK_IN_MS

        expect(time.toWeeks()).toBeCloseTo(acc, NUM_DIGITS)

        time.addHours(hour)
        acc += (hour * ONE_HOUR_IN_MS) / ONE_WEEK_IN_MS

        expect(time.toWeeks()).toBeCloseTo(acc, NUM_DIGITS)

        time.addDays(day)
        acc += (day * ONE_DAY_IN_MS) / ONE_WEEK_IN_MS

        expect(time.toWeeks()).toBeCloseTo(acc, NUM_DIGITS)

        time.addWeeks(week)
        acc += week

        expect(time.toWeeks()).toBeCloseTo(acc, NUM_DIGITS)

        expect(
            new Time({ ms, second, minute, hour, day, week }).toWeeks()
        ).toBeCloseTo(acc, NUM_DIGITS)
    })

    it('deve retornar o total em milissegundos ao converter para JSON', () => {
        const input = randTime()
        const time = new Time(input)

        expect(JSON.stringify(time)).toBe(`${time.toMilliseconds()}`)
    })

    it('deve clonar uma instância de Time', () => {
        const input = randTime()
        const time = new Time(input)
        const clonedTime = time.clone()

        expect(time).not.toBe(clonedTime)
        expect(time.props).toStrictEqual(clonedTime.props)
    })

    it('deve clonar uma instância de Time passando propriedades novas', () => {
        const input = randTime()
        const time = new Time(input)

        const key = faker.helpers.arrayElement(Object.keys(input)) as TimeUnit
        const clonedTime = time.clone({ [key]: input[key] + 1 })

        expect(time).not.toBe(clonedTime)
        expect(time.props[key]).not.toBe(clonedTime.props[key])
    })
})
