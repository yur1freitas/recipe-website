'use strict'

import { ModalBody } from './ModalBody.js'
import { ModalContent } from './ModalContent.js'
import { ModalFooter } from './ModalFooter.js'
import { ModalHeader } from './ModalHeader.js'
import { ModalRoot, useModal } from './ModalRoot.js'
import { ModalTrigger } from './ModalTrigger.js'

const Modal = {
    Root: ModalRoot,
    Trigger: ModalTrigger,
    Content: ModalContent,
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter
}

export { Modal, useModal }
