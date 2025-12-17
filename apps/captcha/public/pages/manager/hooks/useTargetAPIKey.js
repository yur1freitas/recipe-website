'use strict'

import { useContext } from 'preact/hooks'
import { TargetAPIKeyContext } from '../contexts/TargetAPIKeyContext.js'

export function useTargetAPIKey() {
    const ctx = useContext(TargetAPIKeyContext)

    if (!ctx) {
        throw new Error(
            'O "useTargetAPIKey" deve ser usando dentro de "TargetAPIKeyProvider"'
        )
    }

    return ctx
}
