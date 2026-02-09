import type { SheetTriggerProps } from './SheetTrigger'
import type { SheetTitleProps } from './SheetTitle'
import type { SheetRootProps } from './SheetRoot'
import type { SheetPortalProps } from './SheetPortal'
import type { SheetOverlayProps } from './SheetOverlay'
import type { SheetHeaderProps } from './SheetHeader'
import type { SheetFooterProps } from './SheetFooter'
import type { SheetDescriptionProps } from './SheetDescription'
import type { SheetContentProps } from './SheetContent'
import type { SheetCloseProps } from './SheetClose'

import { SheetTrigger } from './SheetTrigger'
import { SheetTitle } from './SheetTitle'
import { SheetRoot } from './SheetRoot'
import { SheetPortal } from './SheetPortal'
import { SheetOverlay } from './SheetOverlay'
import { SheetHeader } from './SheetHeader'
import { SheetFooter } from './SheetFooter'
import { SheetDescription } from './SheetDescription'
import { SheetContent } from './SheetContent'
import { SheetClose } from './SheetClose'

export const Sheet = {
    Overlay: SheetOverlay,
    Close: SheetClose,
    Content: SheetContent,
    Portal: SheetPortal,
    Root: SheetRoot,
    Description: SheetDescription,
    Trigger: SheetTrigger,
    Title: SheetTitle,
    Header: SheetHeader,
    Footer: SheetFooter
}

export namespace SheetProps {
    export type Root = SheetRootProps
    export type Overlay = SheetOverlayProps
    export type Close = SheetCloseProps
    export type Content = SheetContentProps
    export type Portal = SheetPortalProps
    export type Description = SheetDescriptionProps
    export type Trigger = SheetTriggerProps
    export type Title = SheetTitleProps
    export type Header = SheetHeaderProps
    export type Footer = SheetFooterProps
}
