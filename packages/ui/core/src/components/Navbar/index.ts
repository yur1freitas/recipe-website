import type { NavbarRootProps } from './NavbarRoot'
import type { NavbarLinkProps } from './NavbarLink'
import type { NavbarItemProps } from './NavbarItem'
import type { NavbarGroupProps } from './NavbarGroup'
import type { NavbarContentProps } from './NavbarContent'
import type { NavbarBrandProps } from './NavbarBrand'

import { NavbarRoot } from './NavbarRoot'
import { NavbarLink } from './NavbarLink'
import { NavbarItem } from './NavbarItem'
import { NavbarGroup } from './NavbarGroup'
import { NavbarContent } from './NavbarContent'
import { NavbarBrand } from './NavbarBrand'

export const Navbar = {
    Brand: NavbarBrand,
    Content: NavbarContent,
    Group: NavbarGroup,
    Item: NavbarItem,
    Root: NavbarRoot,
    Link: NavbarLink
}

export namespace NavbarProps {
    export type Root = NavbarRootProps
    export type Content = NavbarContentProps
    export type Group = NavbarGroupProps
    export type Item = NavbarItemProps
    export type Brand = NavbarBrandProps
    export type Link = NavbarLinkProps
}
