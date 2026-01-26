import { randFraction } from './randFraction'
import { randInt } from './randInt'

export function randMixed(): string {
    return `${randInt()} ${randFraction()}`
}
