'use strict'

import { html } from '../html.js'

export const ModalBody = ({ children }) => {
    return html`<div className="modal-body">${children}</div>`
}
