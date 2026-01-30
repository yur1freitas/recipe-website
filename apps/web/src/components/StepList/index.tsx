import type { StepInput } from '@core/cooking'

import type { DragHandler } from '@ui/dnd'

import { StepListRoot } from './StepListRoot'
import { StepListItemMenu } from './StepListItemMenu'
import { StepListItemInfo } from './StepListItemInfo'
import { StepListItem } from './StepListItem'

export interface StepItemEvent {
    index: number
    data: StepInput
}

export interface StepListProps {
    items: StepInput[]
    onItemMove?: DragHandler.End
    onItemEdit?: (event: StepItemEvent) => void
    onItemDelete?: (event: StepItemEvent) => void
}

export function StepList({
    items,
    onItemMove,
    onItemEdit,
    onItemDelete
}: StepListProps): React.JSX.Element {
    const listItems = items.map((data, index) => {
        const key = `Step-${index}`

        const editHandler = onItemEdit && (() => onItemEdit({ index, data }))
        const deleteHandler =
            onItemDelete && (() => onItemDelete({ index, data }))

        return (
            <StepListItem key={key} id={data.order}>
                <StepListItemInfo data={data} />
                <StepListItemMenu
                    onItemDelete={deleteHandler}
                    onItemEdit={editHandler}
                />
            </StepListItem>
        )
    })

    const itemIds = items.map((e) => e.order)

    return (
        <StepListRoot items={itemIds} onItemMove={onItemMove}>
            {listItems}
        </StepListRoot>
    )
}
