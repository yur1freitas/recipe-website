import type { SelectValueProps } from './SelectValue'
import type { SelectTriggerProps } from './SelectTrigger'
import type { SelectScrollUpArrowProps } from './SelectScrollUpArrow'
import type { SelectScrollDownArrowProps } from './SelectScrollDownArrow'
import type { SelectRootProps, SelectValueType } from './SelectRoot'
import type { SelectPositionerProps } from './SelectPositioner'
import type { SelectPortalProps } from './SelectPortal'
import type { SelectPopupProps } from './SelectPopup'
import type { SelectListProps } from './SelectList'
import type { SelectItemTextProps } from './SelectItemText'
import type { SelectItemIndicatorProps } from './SelectItemIndicator'
import type { SelectItemProps } from './SelectItem'
import type { SelectIconProps } from './SelectIcon'
import type { SelectGroupProps } from './SelectGroup'
import type { SelectBackdropProps } from './SelectBackdrop'

import { SelectValue } from './SelectValue'
import { SelectTrigger } from './SelectTrigger'
import { SelectScrollUpArrow } from './SelectScrollUpArrow'
import { SelectScrollDownArrow } from './SelectScrollDownArrow'
import { SelectRoot } from './SelectRoot'
import { SelectPositioner } from './SelectPositioner'
import { SelectPortal } from './SelectPortal'
import { SelectPopup } from './SelectPopup'
import { SelectList } from './SelectList'
import { SelectItemText } from './SelectItemText'
import { SelectItemIndicator } from './SelectItemIndicator'
import { SelectItem } from './SelectItem'
import { SelectIcon } from './SelectIcon'
import { SelectGroup } from './SelectGroup'
import { SelectBackdrop } from './SelectBackdrop'

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

export type { SelectValueType }
