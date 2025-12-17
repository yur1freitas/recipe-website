'use strict'

import { createContext } from 'preact'
import { useContext } from 'preact/hooks'

import { html } from '../html.js'
import { useWatcher } from '../useWatcher.js'

export const ModalContext = createContext(null)

export const useModal = () => {
    const ctx = useContext(ModalContext)

    if (!ctx) {
        throw new Error('O "useModal" deve ser usando dentro de "ModalRoot"')
    }

    return ctx
}

export const ModalRoot = ({ isOpen, children, onOpen, onClose }) => {
    const isOpened = useWatcher(isOpen)

    const open = () => {
        isOpened.value = true
        onOpen?.()
    }

    const close = () => {
        isOpened.value = false
        onClose?.()
    }

    return html`<${ModalContext.Provider} value=${{
        isOpened,
        open,
        close
    }}>${children}<//>`
}
