import type { DialogViewportProps } from './DialogViewport'
import type { DialogTriggerProps } from './DialogTrigger'
import type { DialogTitleProps } from './DialogTitle'
import type { DialogRootProps } from './DialogRoot'
import type { DialogPortalProps } from './DialogPortal'
import type { DialogPopupProps } from './DialogPopup'
import type { DialogDescriptionProps } from './DialogDescription'
import type { DialogCloseProps } from './DialogClose'
import type { DialogBackdropProps } from './DialogBackdrop'
import type { DialogActionsProps } from './DialogActions'

import { DialogViewport } from './DialogViewport'
import { DialogTrigger } from './DialogTrigger'
import { DialogTitle } from './DialogTitle'
import { DialogRoot } from './DialogRoot'
import { DialogPortal } from './DialogPortal'
import { DialogPopup } from './DialogPopup'
import { DialogDescription } from './DialogDescription'
import { DialogClose } from './DialogClose'
import { DialogBackdrop } from './DialogBackdrop'
import { DialogActions } from './DialogActions'

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
