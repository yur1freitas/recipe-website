'use strict'

import { useSignal, useSignalEffect } from '@preact/signals'
import { createContext } from 'preact'

import { findAndDelete } from '../../../lib/array.js'
import { GET } from '../../../lib/http.js'
import { html } from '../../../lib/ui/html.js'

export const APIKeyStoreContext = createContext(null)

export function APIKeyStoreProvider({ children }) {
    const apiKeys = useSignal([])

    const addAPIKey = (key) => {
        apiKeys.value = [...apiKeys.value, key]
    }

    const deleteAPIKey = (id) => {
        apiKeys.value = findAndDelete(
            apiKeys.value,
            (apiKey) => apiKey.id === id
        )
    }

    useSignalEffect(() => {
        async function fetchKeys() {
            const { success, data } = await GET('/settings/apiKeys', {
                credentials: 'include'
            })

            if (success) {
                apiKeys.value = data
            }
        }

        fetchKeys()
    })

    const value = { apiKeys, addAPIKey, deleteAPIKey }

    return html`
        <${APIKeyStoreContext.Provider} value=${value}>
            ${children}
        <//>
    `
}
