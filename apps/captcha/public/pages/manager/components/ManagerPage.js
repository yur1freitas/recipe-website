'use strict'

import { TargetKeyProvider } from '../contexts/TargetKeyContext.js'
import { KeyStoreProvider } from '../contexts/KeyStoreContext.js'
import { ThemeProvider } from '../../../lib/ui/ThemeProvider.js'
import { CreateKeyModal } from './CreateKeyModal.js'
import { html } from '../../../lib/ui/html.js'
import { Settings } from './Settings.js'
import { KeyList } from './KeyList.js'
import { Search } from './Search.js'

export function ManagerPage() {
    return html`
        <${ThemeProvider}>
            <${Search.Root}>
                <${KeyStoreProvider}>
                    <section id="actions">
                        <h1>Gerenciador de Chaves</h1>
                        <${Search.Bar}/>
                        <${CreateKeyModal}/>
                    </section>
                    <section id="listing">
                        <h2>Todas as Chaves</h2>
                        <${TargetKeyProvider}>
                            <${KeyList} />
                        <//>
                    </section>
                <//>
            <//>
        <//>
        <${Settings}/>
    `
}
