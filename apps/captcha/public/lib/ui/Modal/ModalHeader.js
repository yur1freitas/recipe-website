'use strict'

import { useModal } from './ModalRoot.js'
import { html } from '../html.js'

export const ModalHeader = ({ title, description }) => {
    const { close } = useModal()

    return html`<div className="modal-header">
        <div className="modal-title">
            <h3>${title}</h3>
            <button className="modal-close-btn" onClick=${close}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
        </div>
        <div className="modal-description">
            <p>${description}</p>
        </div>
    </div>`
}
