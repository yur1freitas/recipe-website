import { useContext } from 'react'

import type { SortableItemContextValue } from '~/contexts/SortableItemContext'

import { SortableItemContext } from '~/contexts/SortableItemContext'

export function useSortableItem(): SortableItemContextValue {
    const ctx = useContext(SortableItemContext)

    if (ctx === null) {
        throw new Error(
            'O hook useSortableItem deve ser usado dentro de <Sortable.Root>'
        )
    }

    return ctx
}
