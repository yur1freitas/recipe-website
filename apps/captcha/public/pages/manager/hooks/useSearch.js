'use strict'

import { useContext } from 'preact/hooks'

import { SearchContext } from '../contexts/SearchContext.js'

export function useSearch() {
    const ctx = useContext(SearchContext)

    if (!ctx) {
        throw new Error(
            'O "useSearch" deve ser usando dentro de "SearchContext"'
        )
    }

    return ctx
}
