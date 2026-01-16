import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { cx } from 'tailwind-variants/utils'

import type { BoxVariants } from '../Box'

import { Box } from '../Box'

export type DialogPopupProps = BaseDialog.Popup.Props &
    BoxVariants & { className?: string }

export function DialogPopup({
    variant = 'popup',
    className,
    ...props
}: DialogPopupProps): React.JSX.Element {
    const classNames = cx('dialog-popup', className)

    return (
        <BaseDialog.Popup
            {...props}
            className={classNames}
            render={(props) => <Box {...props} variant={variant} />}
        />
    )
}
