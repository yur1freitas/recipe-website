import { faker } from '@faker-js/faker/locale/pt_BR'

export function randIndex(length: number) {
    return faker.number.int({ min: 0, max: Math.max(0, length - 1) })
}
