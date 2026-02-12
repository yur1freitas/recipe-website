import type { SidebarTriggerProps } from './SidebarTrigger'
import type { SidebarRootProps } from './SidebarRoot'
import type { SidebarPanelProps } from './SidebarPanel'
import type { SidebarLinkProps } from './SidebarLink'
import type { SidebarHeaderProps } from './SidebarHeader'
import type { SidebarGroupLabelProps } from './SidebarGroupLabel'
import type { SidebarGroupProps } from './SidebarGroup'
import type { SidebarFooterProps } from './SidebarFooter'
import type { SidebarContentProps } from './SidebarContent'

import { SidebarTrigger } from './SidebarTrigger'
import { SidebarRoot } from './SidebarRoot'
import { SidebarPanel } from './SidebarPanel'
import { SidebarLink } from './SidebarLink'
import { SidebarHeader } from './SidebarHeader'
import { SidebarGroupLabel } from './SidebarGroupLabel'
import { SidebarGroup } from './SidebarGroup'
import { SidebarFooter } from './SidebarFooter'
import { SidebarContent } from './SidebarContent'

export const Sidebar = {
    Root: SidebarRoot,
    Group: SidebarGroup,
    GroupLabel: SidebarGroupLabel,
    Panel: SidebarPanel,
    Content: SidebarContent,
    Header: SidebarHeader,
    Footer: SidebarFooter,
    Trigger: SidebarTrigger,
    Link: SidebarLink
}

export namespace SidebarProps {
    export type Root = SidebarRootProps
    export type Group = SidebarGroupProps
    export type GroupLabel = SidebarGroupLabelProps
    export type Panel = SidebarPanelProps
    export type Content = SidebarContentProps
    export type Header = SidebarHeaderProps
    export type Footer = SidebarFooterProps
    export type Trigger = SidebarTriggerProps
    export type Link = SidebarLinkProps
}
