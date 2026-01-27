'use strict'

import { useSignal, useSignalEffect } from '@preact/signals'

import { useTargetKey } from '../hooks/useTargetKey.js'
import { Modal, useModal } from '../../../lib/ui/Modal/index.js'
import { html } from '../../../lib/ui/html.js'
import { GET, PUT } from '../../../lib/http.js'

const UpdateKeyForm = () => {
    const { targetKey, setTargetKey } = useTargetKey()
    const { close } = useModal()

    const key = useSignal(null)

    const submitHandler = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)

        const count = formData.get('count')
        const saltSize = formData.get('saltSize')
        const difficulty = formData.get('difficulty')

        if (!count || !saltSize || !difficulty) {
            return
        }

        const body = JSON.stringify(
            {
                count: parseInt(count),
                saltSize: parseInt(saltSize),
                difficulty: parseInt(difficulty)
            },
            null,
            0
        )

        const { success } = await PUT(
            `/captcha/keys/${targetKey.value}/config`,
            {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body
            }
        )

        if (success) {
            close()
            setTargetKey(null)
        }
    }

    useSignalEffect(() => {
        const fetchKey = async () => {
            const { success, data } = await GET(
                `/captcha/keys/${targetKey.value}`,
                { credentials: 'include' }
            )

            if (success) {
                key.value = data
            }
        }

        fetchKey()
    })

    return html`
        <form action="#" id="update-key-form" onSubmit=${submitHandler}>
            <div className="field">
                <label htmlFor="count" className="label">Count</label>
                <input 
                    id="count"
                    name="count"
                    type="number"
                    min="0"
                    className="input"
                    value=${key?.value?.config?.count}
                />
            </div>
             <div className="field">
                <label htmlFor="saltSize" className="label">Salt Size</label>
                <input 
                    id="saltSize"
                    name="saltSize"
                    type="number"
                    min="0"
                    className="input"
                     value=${key?.value?.config?.saltSize}
                />
            </div>
             <div className="field">
                <label htmlFor="difficulty" className="label">Dificuldade</label>
                <input 
                    id="difficulty"
                    name="difficulty"
                    type="number"
                    min="0"
                    className="input"
                     value=${key?.value?.config?.difficulty}
                />
            </div>
        </form>
    `
}

export const UpdateKeyModal = ({ children, ...props }) => {
    return html`
        <${Modal.Root} ...${props}>
            ${children}
            <${Modal.Content}>
                <${Modal.Header}
                    title="Atualizar Chave",
                    description="Formulário para atualizar chave"
                />
                <${Modal.Body}>
                    <${UpdateKeyForm}/>
                <//>
                <${Modal.Footer}>
                    <div class="update-key-options">
                        <${Modal.Trigger} type="close">
                            <button 
                                type="button"
                                className="btn btn-full"
                                onClick=${close}
                            > 
                                Cancelar
                            </button>
                        <//>
                        <button 
                            type="submit"
                            form="update-key-form"
                            className="btn btn-full"
                        > 
                            Atualizar
                        </button> 
                    </div>
                <//> 
            <//>
        <//>`
}
