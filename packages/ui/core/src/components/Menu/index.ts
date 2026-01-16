import type { MenuCheckboxItemIndicatorProps } from './MenuCheckboxItemIndicator'
import type { MenuRadioItemIndicatorProps } from './MenuRadioItemIndicator'
import type { MenuSubmenuTriggerProps } from './MenuSubmenuTrigger'
import type { MenuCheckboxItemProps } from './MenuCheckboxItem'
import type { MenuSubmenuRootProps } from './MenuSubmenuRoot'
import type { MenuRadioGroupProps } from './MenuRadioGroup'
import type { MenuPositionerProps } from './MenuPositioner'
import type { MenuGroupLabelProps } from './MenuGroupLabel'
import type { MenuSeparatorProps } from './MenuSeparator'
import type { MenuRadioItemProps } from './MenuRadioItem'
import type { MenuTriggerProps } from './MenuTrigger'
import type { MenuPortalProps } from './MenuPortal'
import type { MenuPopupProps } from './MenuPopup'
import type { MenuGroupProps } from './MenuGroup'
import type { MenuArrowProps } from './MenuArrow'
import type { MenuRootProps } from './MenuRoot'
import type { MenuItemProps } from './MenuItem'

import { MenuCheckboxItemIndicator } from './MenuCheckboxItemIndicator'
import { MenuRadioItemIndicator } from './MenuRadioItemIndicator'
import { MenuSubmenuTrigger } from './MenuSubmenuTrigger'
import { MenuCheckboxItem } from './MenuCheckboxItem'
import { MenuSubmenuRoot } from './MenuSubmenuRoot'
import { MenuRadioGroup } from './MenuRadioGroup'
import { MenuPositioner } from './MenuPositioner'
import { MenuGroupLabel } from './MenuGroupLabel'
import { MenuSeparator } from './MenuSeparator'
import { MenuRadioItem } from './MenuRadioItem'
import { MenuTrigger } from './MenuTrigger'
import { MenuPortal } from './MenuPortal'
import { MenuPopup } from './MenuPopup'
import { MenuGroup } from './MenuGroup'
import { MenuArrow } from './MenuArrow'
import { MenuRoot } from './MenuRoot'
import { MenuItem } from './MenuItem'

export const Menu = {
    Postioner: MenuPositioner,
    Portal: MenuPortal,
    Item: MenuItem,
    GroupLabel: MenuGroupLabel,
    Group: MenuGroup,
    Popup: MenuPopup,
    CheckboxItem: MenuCheckboxItem,
    CheckboxItemIndicator: MenuCheckboxItemIndicator,
    Arrow: MenuArrow,
    RadiGroup: MenuRadioGroup,
    RadioItem: MenuRadioItem,
    RadioItemIndicator: MenuRadioItemIndicator,
    SubmenuRoot: MenuSubmenuRoot,
    SubmenuTrigger: MenuSubmenuTrigger,
    Root: MenuRoot,
    Trigger: MenuTrigger,
    Positioner: MenuPositioner,
    Separator: MenuSeparator
}

export namespace MenuProps {
    export type Separator = MenuSeparatorProps
    export type TriggerProps = MenuTriggerProps
    export type GroupProps = MenuGroupProps
    export type PositionerProps = MenuPositionerProps
    export type PortalProps = MenuPortalProps
    export type ItemProps = MenuItemProps
    export type GroupLabelProps = MenuGroupLabelProps
    export type PopupProps = MenuPopupProps
    export type CheckboxItemProps = MenuCheckboxItemProps
    export type CheckboxItemIndicatorProps = MenuCheckboxItemIndicatorProps
    export type Arrow = MenuArrowProps
    export type RadioGroup = MenuRadioGroupProps
    export type RadioItem = MenuRadioItemProps
    export type RadioItemIndicator = MenuRadioItemIndicatorProps
    export type Root = MenuRootProps
    export type SubmenuRoot = MenuSubmenuRootProps
    export type SubmenuTrigger = MenuSubmenuTriggerProps
}
