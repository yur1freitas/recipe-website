'use strict'

import { useSignal } from '@preact/signals'

import { NewAPIKeyModal } from './NewAPIKeyModal.js'
import { Icons } from './Icons.js'
import { Modal, useModal } from '../../../lib/ui/Modal/index.js'
import { html } from '../../../lib/ui/html.js'
import { POST } from '../../../lib/http.js'

const CreateAPIKeyForm = ({ onSuccess }) => {
    const { close } = useModal()

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const name = formData.get('name')?.trim()

        if (!name || name.length > 120) return

        const body = JSON.stringify({ name }, null, 0)

        const { success, data } = await POST('/settings/apiKeys', {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body
        })

        if (success) {
            close()
            onSuccess?.(data)
        }
    }

    return html`
        <form action="#" id="create-api-key-form" onSubmit=${submitHandler}>
            <div className="field">
                <label htmlFor="name" className="label">Nome</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="input"
                    placeholder="ex. Desenvolvimento"
                />
            </div>
        </form>
    `
}

export const CreateAPIKeyModal = () => {
    const newAPIKey = useSignal(null)

    const successHandler = (data) => {
        newAPIKey.value = data
    }

    const closeHandler = () => {
        newAPIKey.value = null
        window.location.reload()
    }

    return html` <${Modal.Root}>
            <${Modal.Trigger}>
                <button type="button" className="btn btn-full">
                    <${Icons.PlusIcon} />
                    Criar chave de API
                </button>
            <//>
            <${Modal.Content}>
                <${Modal.Header}
                    title="Criar Chave de API"
                    description="Formulário para criação de chaves de API"
                />
                <${Modal.Body}>
                    <${CreateAPIKeyForm} onSuccess=${successHandler} />
                <//>
                <${Modal.Footer}>
                    <button
                        type="submit"
                        form="create-api-key-form"
                        className="btn btn-full"
                    >
                        Criar
                    </button>
                <//>
            <//>
        <//>
        <${NewAPIKeyModal}
            onClose=${closeHandler}
            isOpen=${Boolean(newAPIKey.value)}
            apiKey=${newAPIKey?.value?.apiKey}
        />`
}
