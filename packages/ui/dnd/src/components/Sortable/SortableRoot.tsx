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

import {
    restrictToHorizontalAxis,
    restrictToVerticalAxis
} from '@dnd-kit/modifiers'

export type Axis = 'x' | 'y'

export type SortableItems = ({ id: UniqueIdentifier } | UniqueIdentifier)[]

export interface SortableRootProps extends DndContextProps {
    axis: Axis
    items: SortableItems
    restrictToAxis?: boolean
    children?: React.ReactNode[] | React.ReactNode
}

export function SortableRoot({
    axis,
    items,
    children,
    modifiers = [],
    restrictToAxis,
    ...props
}: SortableRootProps): React.JSX.Element {
    const strategy =
        axis === 'x'
            ? horizontalListSortingStrategy
            : verticalListSortingStrategy

    const _modifiers = restrictToAxis
        ? [
              axis === 'x' ? restrictToHorizontalAxis : restrictToVerticalAxis,
              ...modifiers
          ]
        : modifiers

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    return (
        <DndContext
            sensors={sensors}
            modifiers={_modifiers}
            collisionDetection={closestCenter}
            {...props}
        >
            <SortableContext strategy={strategy} items={items}>
                {children}
            </SortableContext>
        </DndContext>
    )
}
