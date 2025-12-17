'use strict'

import { cloneElement } from 'preact'

import { useModal } from './ModalRoot.js'

export const ModalTrigger = ({ type = 'open', children }) => {
    const { open, close } = useModal()

    return cloneElement(children, { onClick: type === 'open' ? open : close })
}
