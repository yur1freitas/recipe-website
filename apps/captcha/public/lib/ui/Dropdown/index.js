'use strict'

import { DropdownRoot, useDropdown } from './DropdownRoot.js'
import { DropdownTrigger } from './DropdownTrigger.js'
import { DropdownContent } from './DropdownContent.js'
import { DropdownLabel } from './DropdownLabel.js'
import { DropdownItem } from './DropdownItem.js'

const Dropdown = {
    Root: DropdownRoot,
    Trigger: DropdownTrigger,
    Content: DropdownContent,
    Label: DropdownLabel,
    Item: DropdownItem
}

export { Dropdown, useDropdown }
