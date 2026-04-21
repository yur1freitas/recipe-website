'use strict'

import { createContext } from 'preact'
import { useSignal } from '@preact/signals'

import { html } from '../../../lib/ui/html.js'

export const TargetKeyContext = createContext(null)

export function TargetKeyProvider({ children }) {
    const targetKey = useSignal(null)

    const setTargetKey = (key) => {
        targetKey.value = key
    }

    const value = { targetKey, setTargetKey }

    return html`
        <${TargetKeyContext.Provider} value=${value}> ${children} <//>
    `
}
