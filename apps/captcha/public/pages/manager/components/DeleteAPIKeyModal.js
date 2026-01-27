'use strict'

import { useTargetAPIKey } from '../hooks/useTargetAPIKey.js'
import { useAPIKeyStore } from '../hooks/useAPIKeyStore.js'
import { Modal, useModal } from '../../../lib/ui/Modal/index.js'
import { html } from '../../../lib/ui/html.js'
import { DELETE } from '../../../lib/http.js'

const DeleteButton = () => {
    const { close } = useModal()
    const { deleteAPIKey } = useAPIKeyStore()
    const { targetAPIKey, setTargetAPIKey } = useTargetAPIKey()

    const clickHandler = async () => {
        const { success } = await DELETE(
            `/settings/apiKeys/${targetAPIKey.value}`,
            {
                credentials: 'include'
            }
        )

        if (success) {
            close()
        }

        deleteAPIKey(targetAPIKey.value)
        setTargetAPIKey(null)
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

export const DeleteAPIKeyModal = ({ children, ...props }) => {
    return html`
    <${Modal.Root} ...${props}> 
        ${children}
        <${Modal.Content}>
               <${Modal.Header} 
                    title="Apagar Chave de API", 
                    description="Formulário para deletar chave" 
               />
               <${Modal.Body}>
                    <${DeleteButton}/>
               <//>  
        <//>
    <//>`
}
