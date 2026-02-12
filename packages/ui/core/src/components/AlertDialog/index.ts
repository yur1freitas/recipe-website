import type { AlertDialogViewportProps } from './AlertDialogViewport'
import type { AlertDialogTriggerProps } from './AlertDialogTrigger'
import type { AlertDialogTitleProps } from './AlertDialogTitle'
import type { AlertDialogRootProps } from './AlertDialogRoot'
import type { AlertDialogPortalProps } from './AlertDialogPortal'
import type { AlertDialogPopupProps } from './AlertDialogPopup'
import type { AlertDialogDescriptionProps } from './AlertDialogDescription'
import type { AlertDialogCloseProps } from './AlertDialogClose'
import type { AlertDialogBackdropProps } from './AlertDialogBackdrop'
import type { AlertDialogActionsProps } from './AlertDialogActions'

import { AlertDialogViewport } from './AlertDialogViewport'
import { AlertDialogTrigger } from './AlertDialogTrigger'
import { AlertDialogTitle } from './AlertDialogTitle'
import { AlertDialogRoot } from './AlertDialogRoot'
import { AlertDialogPortal } from './AlertDialogPortal'
import { AleartDialogPopup } from './AlertDialogPopup'
import { AlertDialogDescription } from './AlertDialogDescription'
import { AlertDialogClose } from './AlertDialogClose'
import { AlertDialogBackdrop } from './AlertDialogBackdrop'
import { AlertDialogActions } from './AlertDialogActions'

export const AlertDialog = {
    Backdrop: AlertDialogBackdrop,
    Close: AlertDialogClose,
    Popup: AleartDialogPopup,
    Portal: AlertDialogPortal,
    Root: AlertDialogRoot,
    Description: AlertDialogDescription,
    Trigger: AlertDialogTrigger,
    Title: AlertDialogTitle,
    Viewport: AlertDialogViewport,
    Actions: AlertDialogActions
}

export namespace AlertDialogProps {
    export type RootProps = AlertDialogRootProps
    export type BackdropProps = AlertDialogBackdropProps
    export type CloseProps = AlertDialogCloseProps
    export type PopupProps = AlertDialogPopupProps
    export type PortalProps = AlertDialogPortalProps
    export type DescriptionProps = AlertDialogDescriptionProps
    export type TriggerProps = AlertDialogTriggerProps
    export type TitleProps = AlertDialogTitleProps
    export type Viewport = AlertDialogViewportProps
    export type Actions = AlertDialogActionsProps
}
