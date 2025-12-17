'use strict'

import { DropdownContent } from './DropdownContent.js'
import { DropdownItem } from './DropdownItem.js'
import { DropdownLabel } from './DropdownLabel.js'
import { DropdownRoot, useDropdown } from './DropdownRoot.js'
import { DropdownTrigger } from './DropdownTrigger.js'

const Dropdown = {
    Root: DropdownRoot,
    Trigger: DropdownTrigger,
    Content: DropdownContent,
    Label: DropdownLabel,
    Item: DropdownItem
}

export { Dropdown, useDropdown }
