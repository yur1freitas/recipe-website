'use strict'

import { ModalTrigger } from './ModalTrigger.js'
import { ModalRoot, useModal } from './ModalRoot.js'
import { ModalHeader } from './ModalHeader.js'
import { ModalFooter } from './ModalFooter.js'
import { ModalContent } from './ModalContent.js'
import { ModalBody } from './ModalBody.js'

const Modal = {
    Root: ModalRoot,
    Trigger: ModalTrigger,
    Content: ModalContent,
    Header: ModalHeader,
    Body: ModalBody,
    Footer: ModalFooter
}

export { Modal, useModal }
