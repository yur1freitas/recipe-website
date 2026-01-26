import { faker } from '@faker-js/faker/locale/pt_BR'

export function randFloat(): string {
    return `${faker.number.int({ min: 0, max: 100 })}.${faker.number.int({ min: 0, max: 100 })}`
}
