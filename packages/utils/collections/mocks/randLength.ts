import { faker } from '@faker-js/faker/locale/pt_BR'

export function randLength(max: number = 10): number {
    return faker.number.int({ min: 2, max })
}
