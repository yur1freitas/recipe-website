'use strict'

import { useTargetKey } from '../hooks/useTargetKey.js'
import { useKeyStore } from '../hooks/useKeyStore.js'
import { Modal, useModal } from '../../../lib/ui/Modal/index.js'
import { html } from '../../../lib/ui/html.js'
import { DELETE } from '../../../lib/http.js'

const DeleteButton = () => {
    const { close } = useModal()
    const { deleteKey } = useKeyStore()
    const { targetKey, setTargetKey } = useTargetKey()

    const clickHandler = async () => {
        const { success } = await DELETE(`/captcha/keys/${targetKey.value}`, {
            credentials: 'include'
        })

        if (success) {
            close()
        }

        deleteKey(targetKey.value)
        setTargetKey(null)
    }

    return html`
        <button 
            type="button"
            className="btn btn-full"
            onClick=${clickHandler}
        > 
            Deletar
        </button>
    `
}

export const DeleteKeyModal = ({ children, ...props }) => {
    return html`
    <${Modal.Root} ...${props}> 
        ${children}
        <${Modal.Content}>
               <${Modal.Header} 
                    title="Apagar Chaves", 
                    description="Formulário para deletar chaves" 
               />
               <${Modal.Body}>
                    <${DeleteButton}/>
               <//>  
        <//>
    <//>`
}
