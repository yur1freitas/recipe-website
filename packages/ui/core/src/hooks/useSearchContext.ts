import { use } from 'react'

import type { SearchContextValue } from '~/contexts/SearchContext'

import { SearchContext } from '~/contexts/SearchContext'

export function useSearchContext(): SearchContextValue {
    const ctx = use(SearchContext)

    if (!ctx) {
        throw new Error(
            'O hook useSearchContext deve ser usado dentro de <SearchRoot>'
        )
    }

    return ctx
}
