import { v7 as uuid } from 'uuid'

export function randId(): string {
    return uuid()
}
