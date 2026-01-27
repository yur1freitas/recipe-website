'use strict'

import { useSignal } from '@preact/signals'

import { NewKeyModal } from './NewKeyModal.js'
import { Icons } from './Icons.js'
import { Modal, useModal } from '../../../lib/ui/Modal/index.js'
import { html } from '../../../lib/ui/html.js'
import { POST } from '../../../lib/http.js'

const CreateKeyForm = ({ onSuccess }) => {
    const { close } = useModal()

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const name = formData.get('name')?.trim()

        if (!name || name.length > 120) return

        const body = JSON.stringify({ name }, null, 0)

        const { success, data } = await POST('/captcha/keys', {
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
        <form action="#" id="create-keys-form" onSubmit=${submitHandler}>
            <div className="field">
                <label htmlFor="name" className="label">Nome</label>
                <input 
                    id="name"
                    name="name"
                    type="text"
                    className="input"
                    placeholder="ex. Produção"
                />
            </div>
        </form>
    `
}

export const CreateKeyModal = () => {
    const newKey = useSignal(null)

    const successHandler = (data) => {
        newKey.value = data
    }

    const closeHandler = () => {
        newKey.value = null
        window.location.reload()
    }

    return html`
        <${Modal.Root}>
            <${Modal.Trigger}>
                <button 
                    type="button" 
                    className="btn btn-full"
                >
                    <${Icons.PlusIcon}/>
                    Criar chaves
                </button>
            <//>
            <${Modal.Content}>
                <${Modal.Header}
                    title="Criar Chaves",
                    description="Formulário para criação de chaves"
                />
                <${Modal.Body}>
                    <${CreateKeyForm} onSuccess=${successHandler}/>
                <//>  
                <${Modal.Footer}>
                    <button 
                        type="submit"
                         form="create-keys-form"
                        className="btn btn-full"
                    > 
                        Criar
                    </button>
                <//>
            <//>
        <//>
        <${NewKeyModal} 
            onClose=${closeHandler}
            isOpen=${Boolean(newKey.value)} 
            secretKey=${newKey?.value?.secretKey}
            siteKey=${newKey?.value?.siteKey}
        />`
}
