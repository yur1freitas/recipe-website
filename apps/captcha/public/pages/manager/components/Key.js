'use strict'

import { Icons } from './Icons.js'
import { html } from '../../../lib/ui/html.js'
import { Dropdown } from '../../../lib/ui/Dropdown/index.js'

const KeyRoot = ({ children }) => {
    return html`<div className="key">${children}</div>`
}

const KeyInfo = ({ name, createdAt }) => {
    const createdAtISO = Intl.DateTimeFormat('pt-BR').format(createdAt)

    return html`
        <div className="key-info">
            <p className="key-name">${name}</p>
            <time className="key-created-at"> ${createdAtISO} </time>
        </div>
    `
}

const KeyOptions = ({ children, onSelect }) => {
    return html`
        <div className="key-options">
            <${Dropdown.Root} onSelect=${onSelect}>
                <${Dropdown.Trigger}>
                    <button type="button">
                        <${Icons.EllipsisVerticalIcon} />
                    </button>
                <//>
                <${Dropdown.Content}>
                    <${Dropdown.Label} label="Opções" />
                    ${children}
                <//>
            <//>
        </div>
    `
}

const KeyOption = Dropdown.Item

export const Key = {
    Root: KeyRoot,
    Info: KeyInfo,
    Options: KeyOptions,
    Option: KeyOption
}
