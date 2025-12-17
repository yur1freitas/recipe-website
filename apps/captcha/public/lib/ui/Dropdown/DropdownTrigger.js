import { cloneElement } from 'preact'

import { useDropdown } from './DropdownRoot.js'

export const DropdownTrigger = ({ children }) => {
    const { triggerRef, open } = useDropdown()

    return cloneElement(children, {
        ref: triggerRef,
        onClick: open
    })
}
