import type { DialogDescriptionProps } from './DialogDescription'
import type { DialogViewportProps } from './DialogViewport'
import type { DialogBackdropProps } from './DialogBackdrop'
import type { DialogTriggerProps } from './DialogTrigger'
import type { DialogActionsProps } from './DialogActions'
import type { DialogPortalProps } from './DialogPortal'
import type { DialogTitleProps } from './DialogTitle'
import type { DialogPopupProps } from './DialogPopup'
import type { DialogCloseProps } from './DialogClose'
import type { DialogRootProps } from './DialogRoot'

import { DialogDescription } from './DialogDescription'
import { DialogViewport } from './DialogViewport'
import { DialogBackdrop } from './DialogBackdrop'
import { DialogTrigger } from './DialogTrigger'
import { DialogActions } from './DialogActions'
import { DialogPortal } from './DialogPortal'
import { DialogTitle } from './DialogTitle'
import { DialogPopup } from './DialogPopup'
import { DialogClose } from './DialogClose'
import { DialogRoot } from './DialogRoot'

export const Dialog = {
    Backdrop: DialogBackdrop,
    Close: DialogClose,
    Popup: DialogPopup,
    Portal: DialogPortal,
    Root: DialogRoot,
    Description: DialogDescription,
    Trigger: DialogTrigger,
    Title: DialogTitle,
    Viewport: DialogViewport,
    Actions: DialogActions
}

export namespace DialogProps {
    export type RootProps = DialogRootProps
    export type BackdropProps = DialogBackdropProps
    export type CloseProps = DialogCloseProps
    export type PopupProps = DialogPopupProps
    export type PortalProps = DialogPortalProps
    export type DescriptionProps = DialogDescriptionProps
    export type TriggerProps = DialogTriggerProps
    export type TitleProps = DialogTitleProps
    export type Viewport = DialogViewportProps
    export type Actions = DialogActionsProps
}
