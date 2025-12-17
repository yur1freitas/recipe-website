'use strict'

import { useSignal } from '@preact/signals'
import { createContext } from 'preact'

import { html } from '../../../lib/ui/html.js'

export const SearchContext = createContext(null)

export function SearchProvider({ children }) {
    const search = useSignal('')

    const setSearch = (text) => {
        search.value = text
    }

    return html`
        <${SearchContext.Provider} value=${{ search, setSearch }}>
            ${children}
        <//>
    `
}
