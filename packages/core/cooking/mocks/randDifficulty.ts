import { faker } from '@faker-js/faker/locale/pt_BR'

import { DifficultyEnum } from '~/recipe/constants/DifficultyEnum'

export interface RandDifficultyOptions {
    testCase?: 'invalid' | 'success'
}

export function randDifficulty(
    options?: RandDifficultyOptions
): DifficultyEnum {
    switch (options?.testCase) {
        case 'invalid': {
            return faker.lorem.word() as DifficultyEnum
        }
        default: {
            return faker.helpers.arrayElement(Object.values(DifficultyEnum))
        }
    }
}
