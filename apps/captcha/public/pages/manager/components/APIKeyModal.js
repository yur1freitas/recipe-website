'use strict'

import { useSignal } from '@preact/signals'

import { TargetAPIKeyProvider } from '../contexts/TargetAPIKeyContext.js'
import { APIKeyStoreProvider } from '../contexts/APIKeyStoreContext.js'
import { Modal, useModal } from '../../../lib/ui/Modal/index.js'
import { html } from '../../../lib/ui/html.js'
import { POST } from '../../../lib/http.js'
import { CreateAPIKeyModal } from './CreateAPIKeyModal.js'
import { APIKeyList } from './APIKeyList.js'

const APIKeyForm = () => {
    const { close } = useModal()
    const isDisabled = useSignal(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        const { success } = await POST('/settings/apiKeys', {
            credentials: 'include'
        })

        if (success) {
            close()
        }
    }

    return html`
        <form action="#" onSubmit=${submitHandler}>
                <button 
                    type="submit"
                    className="btn btn-full"
                    disabled=${isDisabled.value}
                >
                    Criar chave de API
                </button>
        </form>
    `
}

export const APIKeyModal = ({ isOpen, onClose }) => {
    return html`
        <${APIKeyStoreProvider}>
            <${Modal.Root} isOpen=${isOpen} onClose=${onClose}>
                <${Modal.Content}>
                    <${Modal.Header}
                        title="Chaves de API"
                        description="Acesse e Gerencie suas chaves de API"
                    />
                    <${Modal.Body}>
                        <${APIKeyStoreProvider}>
                            <${CreateAPIKeyModal}/>
                            <${TargetAPIKeyProvider}>
                                <${APIKeyList}/>
                            <//>
                        <//>
                    <//>
                <//>
            <//>
        <//>
    `
}
