'use strict'

import { createPortal } from 'preact/compat'

import { html } from '../html.js'
import { useModal } from './ModalRoot.js'

export const ModalContent = ({ children }) => {
    const { isOpened } = useModal()

    if (isOpened.value) {
        return createPortal(
            html`
            <div id="modal">
                <div className="modal-content">${children}</div>
            </div>`,
            document.body
        )
    }

    return null
}
