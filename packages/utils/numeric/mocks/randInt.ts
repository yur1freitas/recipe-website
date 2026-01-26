import { faker } from '@faker-js/faker/locale/pt_BR'

export function randInt(): string {
    return `${faker.number.int({ min: -100, max: 100 })}`
}
