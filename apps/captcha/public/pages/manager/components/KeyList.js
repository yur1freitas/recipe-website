'use strict'

import { useSignal } from '@preact/signals'

import { UpdateKeyModal } from './UpdateKeyModal.js'
import { Key } from './Key.js'
import { DeleteKeyModal } from './DeleteKeyModal.js'
import { useTargetKey } from '../hooks/useTargetKey.js'
import { useSearch } from '../hooks/useSearch.js'
import { useKeyStore } from '../hooks/useKeyStore.js'
import { html } from '../../../lib/ui/html.js'

const compareNames = (a, b) => a.toLowerCase().includes(b.toLowerCase())

export const KeyList = () => {
    const { search } = useSearch()
    const { keys } = useKeyStore()
    const { setTargetKey } = useTargetKey()

    const selectedOption = useSignal('')

    const isOpen = {
        deleteModal: selectedOption.value === 'delete',
        updateModal: selectedOption.value === 'update'
    }

    const dropdownCloseHandler = () => {
        selectedOption.value = ''
    }

    const filteredItems = search
        ? keys.value.filter((item) => compareNames(item.name, search.value))
        : keys.value

    const items = filteredItems.map(({ name, siteKey, createdAt }) => {
        const selectHandler = (value) => {
            selectedOption.value = value
            setTargetKey(siteKey)
        }

        return html`
            <li>
                <${Key.Root}>
                    <${Key.Info} name=${name} createdAt=${createdAt} />
                    <${Key.Options} onSelect=${selectHandler}>
                        <${Key.Option} label="Atualizar" value="update"/>
                        <${Key.Option} label="Deletar" value="delete"/>
                    <//>
                <//>
            </li>`
    })

    return html`
        <ul className="key-list">${items}</ul> 
        <${UpdateKeyModal} isOpen=${isOpen.updateModal} onClose=${dropdownCloseHandler}/> 
        <${DeleteKeyModal} isOpen=${isOpen.deleteModal} onClose=${dropdownCloseHandler}/> 
    `
}
