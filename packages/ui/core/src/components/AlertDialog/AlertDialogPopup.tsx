import { cx } from 'tailwind-variants/utils'
import { AlertDialog as BaseAleartDialog } from '@base-ui/react/alert-dialog'

import type { BoxVariants } from '../Box'

import { Box } from '../Box'

export type AlertDialogPopupProps = BaseAleartDialog.Popup.Props &
    BoxVariants & { className?: string }

export function AleartDialogPopup({
    variant = 'popup',
    className,
    ...props
}: AlertDialogPopupProps): React.JSX.Element {
    const classNames = cx('alert-dialog-popup', className)

    return (
        <BaseAleartDialog.Popup
            render={(props) => <Box variant={variant} {...props} />}
            className={classNames}
            {...props}
        />
    )
}
