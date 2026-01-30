import { Ingredient } from '@core/cooking'
import type { IngredientInput } from '@core/cooking'

import { Typography } from '@ui/core/Typography'

export interface IngredientListItemInfoProps {
    data: IngredientInput
}

export function IngredientListItemInfo({ data }: IngredientListItemInfoProps) {
    const ingredient = new Ingredient(data)

    return (
        <div className='flex flex-col overflow-hidden'>
            <Typography.Paragraph className='text-sm font-semibold truncate'>
                {ingredient.name.value}
            </Typography.Paragraph>
            <Typography.Small className='truncate'>
                {ingredient.format()}
            </Typography.Small>
        </div>
    )
}
