'use strict'

import { useContext } from 'preact/hooks'

import { KeyStoreContext } from '../contexts/KeyStoreContext.js'

export function useKeyStore() {
    const ctx = useContext(KeyStoreContext)

    if (!ctx) {
        throw new Error(
            'O "useKeyStore" deve ser usando dentro de "KeyProvider"'
        )
    }

    return ctx
}
