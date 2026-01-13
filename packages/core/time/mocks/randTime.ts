import type { TimeInput } from '~/types'

import { randSeconds } from './randSeconds'
import { randMinutes } from './randMinutes'
import { randMilliseconds } from './randMilliseconds'
import { randHours } from './randHours'

export type RandTimeOptions = TimeInput

export function randTime(options?: RandTimeOptions): Required<TimeInput> {
    return {
        ms: options?.ms ?? randMilliseconds(),
        second: options?.second ?? randSeconds(),
        minute: options?.minute ?? randMinutes(),
        hour: options?.hour ?? randHours()
    }
}
