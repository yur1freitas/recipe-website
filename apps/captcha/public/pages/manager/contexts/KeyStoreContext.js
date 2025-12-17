'use strict'

import { useSignal, useSignalEffect } from '@preact/signals'
import { createContext } from 'preact'

import { findAndDelete } from '../../../lib/array.js'
import { GET } from '../../../lib/http.js'
import { html } from '../../../lib/ui/html.js'

export const KeyStoreContext = createContext(null)

export function KeyStoreProvider({ children }) {
    const keys = useSignal([])

    const addKey = (key) => {
        keys.value = [...keys.value, key]
    }

    const deleteKey = (siteKey) => {
        keys.value = findAndDelete(keys.value, (key) => key.siteKey === siteKey)
    }

    useSignalEffect(() => {
        async function fetchKeys() {
            const { success, data } = await GET('/captcha/keys', {
                credentials: 'include'
            })

            if (success) {
                keys.value = data
            }
        }

        fetchKeys()
    })

    const value = { keys, addKey, deleteKey }

    return html`
        <${KeyStoreContext.Provider} value=${value}>
            ${children}
        <//>
    `
}
