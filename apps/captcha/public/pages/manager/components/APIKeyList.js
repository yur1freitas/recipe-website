'use strict'

import { useSignal } from '@preact/signals'

import { useTargetAPIKey } from '../hooks/useTargetAPIKey.js'
import { useAPIKeyStore } from '../hooks/useAPIKeyStore.js'
import { DeleteAPIKeyModal } from './DeleteAPIKeyModal.js'
import { html } from '../../../lib/ui/html.js'
import { APIKey } from './APIKey.js'

export const APIKeyList = () => {
    const { apiKeys } = useAPIKeyStore()
    const { setTargetAPIKey } = useTargetAPIKey()

    const selectedOption = useSignal('')

    const isOpen = {
        deleteModal: selectedOption.value === 'delete'
    }

    const dropdownCloseHandler = () => {
        selectedOption.value = ''
    }

    const items = apiKeys.value.map(({ id, name, createdAt }) => {
        const selectHandler = (value) => {
            selectedOption.value = value
            setTargetAPIKey(id)
        }

        return html`
            <li>
                <${APIKey.Root}>
                    <${APIKey.Info} name=${name} createdAt=${createdAt} />
                    <${APIKey.Options} onSelect=${selectHandler}>
                        <${APIKey.Option} label="Deletar" value="delete"/>
                    <//>
                <//>
            </li>`
    })

    return html`
        <ul className="api-key-list">${items}</ul>
        <${DeleteAPIKeyModal} isOpen=${isOpen.deleteModal} onClose=${dropdownCloseHandler}/> 
    `
}
