'use strict'

import { useSignalRef } from '@preact/signals/utils'
import { useSignal } from '@preact/signals'

import { useContext } from 'preact/hooks'
import { createContext } from 'preact'

import { html } from '../html.js'

export const DropdownContext = createContext(null)

export const useDropdown = () => {
    const ctx = useContext(DropdownContext)

    if (!ctx) {
        throw new Error(
            'O "useDropdown" deve ser usando dentro de "DropdownRoot"'
        )
    }

    return ctx
}

export const DropdownRoot = ({ children, onSelect }) => {
    const triggerRef = useSignalRef(null)
    const isOpened = useSignal(false)

    const open = () => {
        isOpened.value = true
    }
    const close = () => {
        isOpened.value = false
    }

    const value = {
        triggerRef,
        isOpened,
        open,
        close,
        onSelect
    }

    return html`<${DropdownContext.Provider} value=${value}>${children}<//>`
}
