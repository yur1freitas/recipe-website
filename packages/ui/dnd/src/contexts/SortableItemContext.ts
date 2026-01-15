import type {
    DraggableSyntheticListeners,
    DraggableAttributes
} from '@dnd-kit/core'

import { createContext } from 'react'

export interface SortableItemContextValue {
    attributes: DraggableAttributes
    listeners: DraggableSyntheticListeners
    ref: (node: HTMLElement | null) => void
}

export const SortableItemContext =
    createContext<SortableItemContextValue | null>(null)
