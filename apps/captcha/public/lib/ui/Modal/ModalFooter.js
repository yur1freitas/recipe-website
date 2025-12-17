'use strict'

import { html } from '../html.js'

export const ModalFooter = ({ children }) => {
    return html`<div className="modal-footer">${children}</div>`
}
