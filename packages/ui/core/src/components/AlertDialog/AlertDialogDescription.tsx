import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'

import { Typography } from '../Typography'

export type AlertDialogDescriptionProps = BaseAlertDialog.Description.Props

export function AlertDialogDescription(
    props: AlertDialogDescriptionProps
): React.JSX.Element {
    return (
        <BaseAlertDialog.Description render={Typography.Paragraph} {...props} />
    )
}
