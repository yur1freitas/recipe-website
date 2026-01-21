import type { CollapsibleRootProps } from './CollapsibleRoot'
import type { CollapsibleTriggerProps } from './CollapsibleTrigger'
import type { CollapsiblePanelProps } from './CollapsiblePanel'
import type { CollapsibleIconProps } from './CollapsibleIcon'

import { CollapsibleRoot } from './CollapsibleRoot'
import { CollapsibleTrigger } from './CollapsibleTrigger'
import { CollapsiblePanel } from './CollapsiblePanel'
import { CollapsibleIcon } from './CollapsibleIcon'

export const Collapsible = {
    Root: CollapsibleRoot,
    Panel: CollapsiblePanel,
    Trigger: CollapsibleTrigger,
    Icon: CollapsibleIcon
}

export namespace CollapsibleProps {
    export type Root = CollapsibleRootProps
    export type Panel = CollapsiblePanelProps
    export type Trigger = CollapsibleTriggerProps
    export type Icon = CollapsibleIconProps
}
