import type { UniqueIdentifier, DndContextProps } from '@dnd-kit/core'

import {
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
    SortableContext
} from '@dnd-kit/sortable'
import {
    KeyboardSensor,
    closestCenter,
    PointerSensor,
    TouchSensor,
    DndContext,
    useSensors,
    useSensor
} from '@dnd-kit/core'

export type Axis = 'x' | 'y'

export type SortableItems = ({ id: UniqueIdentifier } | UniqueIdentifier)[]

export interface SortableRootProps extends DndContextProps {
    axis: Axis
    items: SortableItems
    children?: React.ReactNode[] | React.ReactNode
}

export function SortableRoot({
    axis,
    items,
    children,
    ...props
}: SortableRootProps): React.JSX.Element {
    const strategy =
        axis === 'x'
            ? horizontalListSortingStrategy
            : verticalListSortingStrategy

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    return (
        <DndContext
            {...props}
            collisionDetection={closestCenter}
            sensors={sensors}
        >
            <SortableContext strategy={strategy} items={items}>
                {children}
            </SortableContext>
        </DndContext>
    )
}
