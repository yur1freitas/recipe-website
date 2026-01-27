'use strict'

import { DropdownTrigger } from './DropdownTrigger.js'
import { DropdownRoot, useDropdown } from './DropdownRoot.js'
import { DropdownLabel } from './DropdownLabel.js'
import { DropdownItem } from './DropdownItem.js'
import { DropdownContent } from './DropdownContent.js'

const Dropdown = {
    Root: DropdownRoot,
    Trigger: DropdownTrigger,
    Content: DropdownContent,
    Label: DropdownLabel,
    Item: DropdownItem
}

export { Dropdown, useDropdown }
