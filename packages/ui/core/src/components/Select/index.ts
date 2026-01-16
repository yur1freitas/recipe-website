import type { SelectScrollDownArrowProps } from './SelectScrollDownArrow'
import type { SelectScrollUpArrowProps } from './SelectScrollUpArrow'
import type { SelectItemIndicatorProps } from './SelectItemIndicator'
import type { SelectPositionerProps } from './SelectPositioner'
import type { SelectItemTextProps } from './SelectItemText'
import type { SelectBackdropProps } from './SelectBackdrop'
import type { SelectTriggerProps } from './SelectTrigger'
import type { SelectPortalProps } from './SelectPortal'
import type { SelectValueProps } from './SelectValue'
import type { SelectPopupProps } from './SelectPopup'
import type { SelectGroupProps } from './SelectGroup'
import type { SelectRootProps } from './SelectRoot'
import type { SelectListProps } from './SelectList'
import type { SelectItemProps } from './SelectItem'
import type { SelectIconProps } from './SelectIcon'

import { SelectScrollDownArrow } from './SelectScrollDownArrow'
import { SelectScrollUpArrow } from './SelectScrollUpArrow'
import { SelectItemIndicator } from './SelectItemIndicator'
import { SelectPositioner } from './SelectPositioner'
import { SelectItemText } from './SelectItemText'
import { SelectBackdrop } from './SelectBackdrop'
import { SelectTrigger } from './SelectTrigger'
import { SelectPortal } from './SelectPortal'
import { SelectValue } from './SelectValue'
import { SelectPopup } from './SelectPopup'
import { SelectGroup } from './SelectGroup'
import { SelectRoot } from './SelectRoot'
import { SelectList } from './SelectList'
import { SelectItem } from './SelectItem'
import { SelectIcon } from './SelectIcon'

export const Select = {
    Backdrop: SelectBackdrop,
    Group: SelectGroup,
    Icon: SelectIcon,
    Item: SelectItem,
    ItemIndicator: SelectItemIndicator,
    ItemText: SelectItemText,
    List: SelectList,
    Popup: SelectPopup,
    Portal: SelectPortal,
    Positioner: SelectPositioner,
    Root: SelectRoot,
    ScrollDownArrow: SelectScrollDownArrow,
    ScrollUpArrow: SelectScrollUpArrow,
    Trigger: SelectTrigger,
    Value: SelectValue
}

export namespace SelectProps {
    export type RootProps<
        Value,
        Multiple extends boolean | undefined = false
    > = SelectRootProps<Value, Multiple>
    export type BackdropProps = SelectBackdropProps
    export type GroupProps = SelectGroupProps
    export type IconProps = SelectIconProps
    export type ItemProps = SelectItemProps
    export type ItemIndicatorProps = SelectItemIndicatorProps
    export type ItemItemTextProps = SelectItemTextProps
    export type ListProps = SelectListProps
    export type PopupProps = SelectPopupProps
    export type PortalProps = SelectPortalProps
    export type PositionerProps = SelectPositionerProps
    export type ScrollUpArrowProps = SelectScrollUpArrowProps
    export type ScrollDownArrowProps = SelectScrollDownArrowProps
    export type TriggerProps = SelectTriggerProps
    export type ValueProps = SelectValueProps
}
