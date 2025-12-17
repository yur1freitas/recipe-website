'use strict'

import { html } from '../../../lib/ui/html.js'
import { ThemeProvider } from '../../../lib/ui/ThemeProvider.js'

import { Form } from './Form.js'

export const Login = () => {
    return html`
        <${ThemeProvider}>
            <section id="login">
                <div class="card">
                    <div class="card-header">
                        <h1>Login</h1>
                    </div>
                    <div class="card-body">
                        <${Form}/>
                    </div>
                </div>
             </section>
        <//>`
}
