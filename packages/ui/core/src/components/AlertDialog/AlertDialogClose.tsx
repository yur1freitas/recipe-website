import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'

import type { ButtonVariants } from '../Button'

import { Button } from '../Button'

export type AlertDialogCloseProps = BaseAlertDialog.Close.Props &
    ButtonVariants & { className?: string }

export function AlertDialogClose(
    props: AlertDialogCloseProps
): React.JSX.Element {
    return <BaseAlertDialog.Close render={Button} {...props} />
}
