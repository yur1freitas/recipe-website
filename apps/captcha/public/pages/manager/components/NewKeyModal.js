'use strict'

import { html } from '../../../lib/ui/html.js'
import { Modal } from '../../../lib/ui/Modal/index.js'

export const NewKeyModal = ({ siteKey, secretKey, ...props }) => {
    return html`
        <${Modal.Root} ...${props}>
            <${Modal.Content}>
                <${Modal.Header}
                    title="Chaves"
                    description="Essas são as suas chaves. Recomendo que guarde a 'Secret Key' em um lugar securo, porque ela não aparecerá de novo"
                />
                <${Modal.Body}>
                    <div className="created-keys">
                        <div className="field">
                            <label className="label">Site Key</label>
                            <input 
                                id="siteKey"
                                name="siteKey"
                                className="input"
                                readonly
                                value=${siteKey}
                            />
                        </div>
                        <div className="field">
                            <label className="label">Secret Key</label>
                            <input 
                                id="secretKey"
                                name="secretKey"
                                className="input"
                                readonly
                                value=${secretKey}
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
