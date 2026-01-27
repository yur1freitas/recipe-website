'use strict'

import { createContext } from 'preact'
import { useSignal } from '@preact/signals'

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
