'use strict'

import { html } from '../../../lib/ui/html.js'
import { Modal } from '../../../lib/ui/Modal/index.js'

export const NewAPIKeyModal = ({ apiKey, ...props }) => {
    return html`
        <${Modal.Root} ...${props}>
            <${Modal.Content}>
                <${Modal.Header}
                    title="Chave de API"
                    description="Essas é a sua chave. Recomendo que guarde-a em um lugar securo, porque ela não aparecerá de novo"
                />
                <${Modal.Body}>
                    <div className="created-keys">
                        <div className="field">
                            <label className="label">Secret Key</label>
                            <input 
                                id="apiKey"
                                name="apiKey"
                                className="input"
                                readonly
                                value=${apiKey}
                            />
                        </div>
                    </div>
                <//>
                <${Modal.Footer}>
                    <${Modal.Trigger} type="close">
                        <button 
                            type="text"
                            className="btn btn-full"
                            onClick=${close}
                        >
                            Concluído
                        </button>   
                    <//>
                <//>
            <//>
        <//>
    `
}
