'use strict'

import { createPortal } from 'preact/compat'

import { useModal } from './ModalRoot.js'
import { html } from '../html.js'

export const ModalContent = ({ children }) => {
    const { isOpened } = useModal()

    if (isOpened.value) {
        return createPortal(
            html` <div id="modal">
                <div className="modal-content">${children}</div>
            </div>`,
            document.body
        )
    }

    return null
}
