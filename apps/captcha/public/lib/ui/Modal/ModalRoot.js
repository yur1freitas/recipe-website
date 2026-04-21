'use strict'

import { useContext } from 'preact/hooks'
import { createContext } from 'preact'

import { useWatcher } from '../useWatcher.js'
import { html } from '../html.js'

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

    return html`<${ModalContext.Provider}
        value=${{
            isOpened,
            open,
            close
        }}
        >${children}<//
    >`
}
