'use strict'

import { useContext } from 'preact/hooks'
import { TargetKeyContext } from '../contexts/TargetKeyContext.js'

export function useTargetKey() {
    const ctx = useContext(TargetKeyContext)

    if (!ctx) {
        throw new Error(
            'O "useTargetKey" deve ser usando dentro de "TargetKeyProvider"'
        )
    }

    return ctx
}
