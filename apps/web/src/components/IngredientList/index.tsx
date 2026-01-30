import type { IngredientInput } from '@core/cooking'

import { IngredientListRoot } from './IngredientListRoot'
import { IngredientListItemMenu } from './IngredientListItemMenu'
import { IngredientListItemInfo } from './IngredientListItemInfo'
import { IngredientListItem } from './IngredientListItem'

export interface IngredientItemEvent {
    index: number
    data: IngredientInput
}

export interface IngredientListProps {
    items: IngredientInput[]
    onItemEdit?: (event: IngredientItemEvent) => void
    onItemDelete?: (event: IngredientItemEvent) => void
}

export function IngredientList({
    items,
    onItemEdit,
    onItemDelete
}: IngredientListProps): React.JSX.Element {
    const listItems = items.map((data, index) => {
        const key = `Ingredient-${index}`

        const editHandler = onItemEdit && (() => onItemEdit({ index, data }))
        const deleteHandler =
            onItemDelete && (() => onItemDelete({ index, data }))

        return (
            <IngredientListItem key={key}>
                <IngredientListItemInfo data={data} />
                <IngredientListItemMenu
                    onItemEdit={editHandler}
                    onItemDelete={deleteHandler}
                />
            </IngredientListItem>
        )
    })

    return <IngredientListRoot>{listItems}</IngredientListRoot>
}
