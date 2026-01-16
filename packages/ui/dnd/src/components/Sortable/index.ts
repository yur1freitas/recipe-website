import type { SortableDrangHandleProps } from './SortableDragHandle'
import type { SortableRootProps } from './SortableRoot'
import type { SortableItemProps } from './SortableItem'

import { SortableDrangHandle } from './SortableDragHandle'
import { SortableRoot } from './SortableRoot'
import { SortableItem } from './SortableItem'

export const Sortable = {
    Root: SortableRoot,
    Item: SortableItem,
    DragHandle: SortableDrangHandle
}

export namespace SortableProps {
    export type Root = SortableRootProps
    export type Item = SortableItemProps
    export type DragHandle = SortableDrangHandleProps
}
