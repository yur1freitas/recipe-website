import { randId } from '@core/shared/mocks'

import type {
    IngredientInput,
    IngredientProps
} from '~/ingredient/models/Ingredient'

import { randMeasure } from './randMeasure'
import { randUnit } from './randUnit'
import { randName } from './randName'

export type RandIngredientOptions = Partial<IngredientInput>

export function randIngredient(
    options?: RandIngredientOptions
): IngredientProps {
    return {
        id: options?.id ?? randId(),
        name: options?.name ?? randName({ type: 'ingredient' }),
        unit: options?.unit ?? randUnit(),
        measure: options?.measure ?? randMeasure()
    }
}
