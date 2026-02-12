import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog'

import { Typography } from '../Typography'

export type AlertDialogTitleProps = BaseAlertDialog.Title.Props

export function AlertDialogTitle(
    props: AlertDialogTitleProps
): React.JSX.Element {
    return <BaseAlertDialog.Title render={Typography.H2} {...props} />
}
