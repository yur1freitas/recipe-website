import { cx } from 'tailwind-variants/utils'
import { XIcon } from 'lucide-react'
import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { SheetPortal } from './SheetPortal'
import { SheetOverlay } from './SheetOverlay'
import { Icon } from '../Icon'
import { Button } from '../Button'

export type SheetContentSide = 'top' | 'right' | 'bottom' | 'left'

export interface SheetContentProps extends BaseDialog.Popup.Props {
    side?: SheetContentSide
    showCloseButton?: boolean
}

export function SheetContent({
    side = 'left',
    showCloseButton = true,
    className,
    children,
    ...props
}: SheetContentProps) {
    const classNames = cx('sheet-content', className)

    return (
        <SheetPortal>
            <SheetOverlay />

            <BaseDialog.Popup
                data-side={side}
                className={classNames}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <BaseDialog.Close
                        render={
                            <Button
                                size='icon'
                                variant='ghost'
                                className='sheet-close'
                            >
                                <Icon label='Fechar'>
                                    <XIcon />
                                </Icon>
                            </Button>
                        }
                    />
                )}
            </BaseDialog.Popup>
        </SheetPortal>
    )
}
