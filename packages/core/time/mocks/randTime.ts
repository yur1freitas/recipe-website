import type { TimeInput } from '~/types'

import { randMilliseconds } from './randMilliseconds'
import { randSeconds } from './randSeconds'
import { randMinutes } from './randMinutes'
import { randWeeks } from './randWeeks'
import { randHours } from './randHours'
import { randDays } from './randDays'

export type RandTimeOptions = TimeInput

export function randTime(options?: RandTimeOptions): Required<TimeInput> {
    return {
        ms: options?.ms ?? randMilliseconds(),
        second: options?.second ?? randSeconds(),
        minute: options?.minute ?? randMinutes(),
        hour: options?.hour ?? randHours(),
        day: options?.day ?? randDays(),
        week: options?.week ?? randWeeks()
    }
}
