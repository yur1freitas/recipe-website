'use strict'

import { useDropdown } from './DropdownRoot.js'
import { html } from '../html.js'

export const DropdownItem = ({ label, value, onClick }) => {
    const { close, onSelect } = useDropdown()

    const clickHandler = (e) => {
        close()
        onClick?.(e)
        onSelect?.(value)
    }

    return html`<div className="dropdown-item" onClick=${clickHandler}>
        ${label}
    </div>`
}
