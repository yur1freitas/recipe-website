'use strict'

import { useContext } from 'preact/hooks'

import { APIKeyStoreContext } from '../contexts/APIKeyStoreContext.js'

export function useAPIKeyStore() {
    const ctx = useContext(APIKeyStoreContext)

    if (!ctx) {
        throw new Error(
            'O "useAPIKeyStore" deve ser usando dentro de "APIKeyStoreContext"'
        )
    }

    return ctx
}
