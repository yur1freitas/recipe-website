import { describe, it, expect, vi } from 'vitest'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { randTime } from '~mocks/randTime'
import { randSeconds } from '~mocks/randSeconds'
import { randMinutes } from '~mocks/randMinutes'
import { randMilliseconds } from '~mocks/randMilliseconds'
import { randHours } from '~mocks/randHours'

import { Time } from '~/time'
import {
    MAX_AMOUNT_IN_HOURS,
    MAX_AMOUNT_IN_MINUTES,
    MAX_AMOUNT_IN_MS,
    MAX_AMOUNT_IN_SECONDS,
    ONE_HOUR_IN_MS,
    ONE_MINUTE_IN_MS,
    ONE_SECOND_IN_MS
} from '~/constants'

describe('Time', () => {
    const NUM_DIGITS = 2

    it('deve instanciar uma classe Time', () => {
        const input = randTime()
        const time = new Time(input)

        expect(time.ms).toBe(input.ms)
        expect(time.seconds).toBe(input.second)
        expect(time.minutes).toBe(input.minute)
        expect(time.hours).toBe(input.hour)
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

    it('deve acrescentar às horas se os minutos ultrapassarem o limite', () => {
        const minute = faker.number.int({
            min: MAX_AMOUNT_IN_MINUTES,
            max: MAX_AMOUNT_IN_MINUTES * MAX_AMOUNT_IN_HOURS
        })
        const time = new Time({ minute })

        expect(time.minutes).toBeLessThan(MAX_AMOUNT_IN_MINUTES)
        expect(time.hours).toBeGreaterThan(0)
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

    it('deve limitar as horas ao defini-lo', () => {
        const hours = faker.number.int({ min: MAX_AMOUNT_IN_HOURS })
        const time = new Time()

        time.setHours(hours)

        expect(time.hours).toBe(MAX_AMOUNT_IN_HOURS - 1)
    })

    it('deve converter o tempo para milissegundos', () => {
        const { ms, second, minute, hour } = randTime()

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

        expect(new Time({ ms, second, minute, hour }).toMilliseconds()).toBe(
            acc
        )
    })

    it('deve converter o tempo para segundos', () => {
        const { ms, second, minute, hour } = randTime()

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

        expect(new Time({ ms, second, minute, hour }).toSeconds()).toBeCloseTo(
            acc,
            NUM_DIGITS
        )
    })

    it('deve converter o tempo para minutos', () => {
        const { ms, second, minute, hour } = randTime()

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

        expect(new Time({ ms, second, minute, hour }).toMinutes()).toBeCloseTo(
            acc,
            NUM_DIGITS
        )
    })

    it('deve converter o tempo para horas', () => {
        const { ms, second, minute, hour } = randTime()

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

        expect(new Time({ ms, second, minute, hour }).toHours()).toBeCloseTo(
            acc,
            NUM_DIGITS
        )
    })

    it('deve retornar o total em milissegundos ao converter para JSON', () => {
        const input = randTime()
        const time = new Time(input)

        expect(JSON.stringify(time)).toBe(`${time.toMilliseconds()}`)
    })
})
