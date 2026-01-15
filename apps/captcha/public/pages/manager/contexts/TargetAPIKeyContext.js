'use strict'

import { useSignal } from '@preact/signals'
import { createContext } from 'preact'

import { html } from '../../../lib/ui/html.js'

export const TargetAPIKeyContext = createContext(null)

export function TargetAPIKeyProvider({ children }) {
    const targetAPIKey = useSignal(null)

    const setTargetAPIKey = (key) => {
        targetAPIKey.value = key
    }

    const value = { targetAPIKey, setTargetAPIKey }

    return html`
        <${TargetAPIKeyContext.Provider} value=${value}>
            ${children}
        <//>
    `
}
