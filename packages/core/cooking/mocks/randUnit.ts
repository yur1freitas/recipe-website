import { faker } from '@faker-js/faker/locale/pt_BR'

import { UnitEnum } from '~/ingredient/constants/UnitEnum'

export interface RandUnitOptions {
    testCase?: 'invalid' | 'success'
}

export function randUnit(options?: RandUnitOptions): UnitEnum {
    switch (options?.testCase) {
        case 'invalid': {
            return faker.lorem.word() as UnitEnum
        }
        default: {
            return faker.helpers.arrayElement(Object.values(UnitEnum))
        }
    }
}
