import type { RecipeInput, RecipeProps } from '~/recipe/models/Recipe'

import { faker } from '@faker-js/faker/locale/pt_BR'

import { randId } from '@core/shared/mocks'

import { randTool } from './randTool'
import { randStep } from './randStep'
import { randPreparationTime } from './randPreparationTime'
import { randName } from './randName'
import { randIngredient } from './randIngredient'
import { randDifficulty } from './randDifficulty'
import { randDescription } from './randDescription'

export type RandRecipeOptions = Required<RecipeInput>

export function randRecipe(options?: RandRecipeOptions): RecipeProps {
    return {
        id: options?.id ?? randId(),
        authorId: options?.authorId ?? randId(),
        name: options?.name ?? randName({ type: 'dish' }),
        description: options?.description ?? randDescription(),
        difficulty: options?.difficulty ?? randDifficulty(),
        preparationTime: options?.preparationTime ?? randPreparationTime(),
        steps:
            options?.steps ??
            faker.helpers.multiple((_, i) => randStep({ order: i + 1 }), {
                count: faker.number.int({ min: 1, max: 10 })
            }),
        tools:
            options?.tools ??
            faker.helpers.multiple(() => randTool(), {
                count: faker.number.int({ min: 1, max: 10 })
            }),
        ingredients:
            options?.ingredients ??
            faker.helpers.multiple(() => randIngredient(), {
                count: faker.number.int({ min: 1, max: 10 })
            })
    }
}
