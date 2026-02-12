import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'

import type { ButtonVariants } from '../Button'

import { Button } from '../Button'

export type AlertDialogTriggerProps = BaseAlertDialog.Trigger.Props &
    ButtonVariants

export function AlertDialogTrigger(
    props: AlertDialogTriggerProps
): React.JSX.Element {
    return <BaseAlertDialog.Trigger render={Button} {...props} />
}
