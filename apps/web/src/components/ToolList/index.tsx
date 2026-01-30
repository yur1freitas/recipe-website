import type { ToolInput } from '@core/cooking'

import { ToolListRoot } from './ToolListRoot'
import { ToolListItemMenu } from './ToolListItemMenu'
import { ToolListItemInfo } from './ToolListItemInfo'
import { ToolListItem } from './ToolListItem'

export interface ToolItemEvent {
    index: number
    data: ToolInput
}

export interface ToolListProps {
    items: ToolInput[]
    onItemEdit?: (event: ToolItemEvent) => void
    onItemDelete?: (event: ToolItemEvent) => void
}

export function ToolList({
    items,
    onItemEdit,
    onItemDelete
}: ToolListProps): React.JSX.Element {
    const listItems = items.map((data, index) => {
        const key = `Tool-${index}`

        const editHandler = onItemEdit && (() => onItemEdit({ index, data }))
        const deleteHandler =
            onItemDelete && (() => onItemDelete({ index, data }))

        return (
            <ToolListItem key={key}>
                <ToolListItemInfo data={data} />
                <ToolListItemMenu
                    onItemEdit={editHandler}
                    onItemDelete={deleteHandler}
                />
            </ToolListItem>
        )
    })

    return <ToolListRoot>{listItems}</ToolListRoot>
}
