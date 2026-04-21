'use strict'

import { h } from 'preact'
import htm from 'htm'
import { useSignal } from '@preact/signals'

import { Icons } from './Icons.js'
import { POST } from '../../../lib/http.js'

const html = htm.bind(h)

const PasswordField = ({ disabled = false }) => {
    const isVisible = useSignal(false)
    const inputType = isVisible.value ? 'text' : 'password'

    const toggleVisibility = () => (isVisible.value = !isVisible.value)

    return html` <div className="field">
        <label for="password" class="label"> Senha: </label>
        <div class="password-input">
            <input
                id="password"
                name="password"
                type=${inputType}
                placeholder="*****"
                required
                disabled=${disabled}
            />
            <button
                type="button"
                onClick=${toggleVisibility}
                disabled=${disabled}
            >
                ${isVisible.value
                    ? html`<${Icons.EyeIcon} />`
                    : html`<${Icons.EyeClosedIcon} />`}
            </button>
        </div>
    </div>`
}

const SubmitButton = ({ disabled = false }) => {
    return html` <div class="field">
        <button type="submit" class="btn btn-full" disabled=${disabled}>
            <${Icons.LogInIcon} />
            Acessar
        </button>
    </div>`
}

export const Form = () => {
    const isDisabled = useSignal(false)

    const submitHandler = async (e) => {
        isDisabled.value = true

        e.preventDefault()

        const formData = new FormData(e.target)
        const adminKey = formData.get('password')?.trim()

        if (adminKey) {
            const body = JSON.stringify({ adminKey }, null, 0)

            const { success } = await POST('/auth/login', {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body
            })

            if (success) {
                window.location.reload()
            }
        }

        isDisabled.value = false
    }

    return html` <form action="#" className="form" onSubmit=${submitHandler}>
        <${PasswordField} disabled=${isDisabled.value} />
        <${SubmitButton} disabled=${isDisabled.value} />
    </form>`
}
