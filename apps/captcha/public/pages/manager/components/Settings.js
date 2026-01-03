'use strict'

import { useSignal } from '@preact/signals'

import { html } from '../../../lib/ui/html.js'
import { Dropdown } from '../../../lib/ui/Dropdown/index.js'
import { POST } from '../../../lib/http.js'

import { Icons } from '../components/Icons.js'
import { APIKeyModal } from './APIKeyModal.js'

export const Settings = () => {
    const isOpenedAPIKeyModal = useSignal(false)

    const selectHandler = async (option) => {
        switch (option) {
            case 'logout': {
                const { success } = await POST('/auth/logout', {
                    credentials: 'include'
                })

                if (success) {
                    window.location.reload()
                }
                break
            }
            case 'api-key':
                isOpenedAPIKeyModal.value = true
                break
        }
    }

    return html`
    <${Dropdown.Root} onSelect=${selectHandler}>
        <${Dropdown.Trigger}>
            <button type="button" class="btn btn-icon settings-btn">
                <${Icons.Settings}/>
            </button>
        <//>
        <${Dropdown.Content}>
            <${Dropdown.Label} label="Opções" />
            <${Dropdown.Item} label="API Key" value="api-key" />
            <${Dropdown.Item} label="Sair" value="logout" />
        <//>
    <//>
    <${APIKeyModal} 
        isOpen=${isOpenedAPIKeyModal.value} 
        onClose=${() => {
            isOpenedAPIKeyModal.value = false
        }}
    />
    `
}
