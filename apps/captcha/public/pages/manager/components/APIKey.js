'use strict'

import { Dropdown } from '../../../lib/ui/Dropdown/index.js'
import { html } from '../../../lib/ui/html.js'

import { Icons } from './Icons.js'

const APIKeyRoot = ({ children }) => {
    return html`<div className="api-key">${children}</div>`
}

const APIKeyInfo = ({ name, createdAt }) => {
    return html`
        <div className="api-key-info">
            <p className="api-key-name">
                ${name}
            </p>
            <time className="api-key-created-at">
                ${createdAt}
            </time>
        </div>
    `
}

const APIKeyOptions = ({ children, onSelect }) => {
    return html`
       <div className="api-key-options">
            <${Dropdown.Root} onSelect=${onSelect}>
                <${Dropdown.Trigger}>
                    <button type="button">
                        <${Icons.EllipsisVerticalIcon}/>
                    </button>
                <//>
                <${Dropdown.Content}>
                    <${Dropdown.Label} label="Opções"/>
                    ${children}
                <//>
            <//>
       </div>
    `
}

const APIKeyOption = Dropdown.Item

export const APIKey = {
    Root: APIKeyRoot,
    Info: APIKeyInfo,
    Options: APIKeyOptions,
    Option: APIKeyOption
}
