import type { CSSProperties } from 'react'
import type { UniqueIdentifier } from '@dnd-kit/core'

import { useRender } from '@base-ui/react/use-render'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

import { SortableItemContext } from '~/contexts/SortableItemContext'

export type SortableItemProps = {
    id: UniqueIdentifier
    asChild?: boolean
} & useRender.ComponentProps<'div'>

export function SortableItem({
    id,
    style,
    render,
    children,
    ...props
}: SortableItemProps): React.JSX.Element {
    const {
        isOver,
        isSorting,
        isDragging,
        listeners,
        attributes,
        transform,
        transition,
        setNodeRef,
        setActivatorNodeRef
    } = useSortable({ id })

    const styles: CSSProperties = {
        ...style,
        transition,
        transform: CSS.Translate.toString(transform)
    }

    const context = {
        listeners,
        attributes,
        ref: setActivatorNodeRef
    }

    const element = useRender({
        defaultTagName: 'div',
        ref: setNodeRef,
        render,
        props: {
            ...props,
            'data-dragging': isDragging,
            'data-sorting': isSorting,
            'data-over': isOver,
            'style': styles,
            children
        }
    })

    return (
        <SortableItemContext.Provider value={context}>
            {element}
        </SortableItemContext.Provider>
    )
}
