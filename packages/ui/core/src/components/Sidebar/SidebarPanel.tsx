import { cx } from 'tailwind-variants/utils'

import { useSidebarContext } from '~/hooks/useSidebarContext'

import type { SheetContentProps } from '../Sheet/SheetContent'

import { Sheet } from '../Sheet'

export const DEFAULT_SIDEBAR_WIDTH = '16rem'
export const DEFAULT_SIDEBAR_WIDTH_MOBILE = '18rem'
export const DEFAULT_SIDEBAR_WIDTH_COLLAPSED = '4rem'
export const DEFAULT_SIDEBAR_HEIGHT = 'auto'

export type SidebarSide = 'left' | 'right'

export interface SidebarPanelProps extends SheetContentProps {
    side?: SidebarSide
    width?: string | number
    mobileWidth?: string | number
    collapsedWidth?: string | number
    height?: string | number
}

export function SidebarPanel({
    side = 'left',
    width,
    mobileWidth,
    collapsedWidth,
    height,
    dir,
    style,
    children,
    className,
    ...props
}: SidebarPanelProps): React.JSX.Element {
    const classNames = cx('sidebar-panel', className)

    const { isOpen, isMobile, isOpenMobile, setOpenMobile } =
        useSidebarContext()

    const sidebarWidth = isMobile
        ? (mobileWidth ?? DEFAULT_SIDEBAR_WIDTH_MOBILE)
        : isOpen
          ? (width ?? DEFAULT_SIDEBAR_WIDTH)
          : (collapsedWidth ?? DEFAULT_SIDEBAR_WIDTH_COLLAPSED)

    const sidebarHeight = height ?? DEFAULT_SIDEBAR_HEIGHT

    const styles = {
        '--sidebar-width': sidebarWidth,
        '--sidebar-height': sidebarHeight,
        ...style
    } as React.CSSProperties

    if (isMobile) {
        return (
            <Sheet.Root open={isOpenMobile} onOpenChange={setOpenMobile}>
                <Sheet.Content
                    data-mobile='true'
                    dir={dir}
                    side={side}
                    style={styles}
                    className={classNames}
                    {...props}
                >
                    <Sheet.Header className='sr-only'>
                        <Sheet.Title>Barra Lateral</Sheet.Title>
                        <Sheet.Description>
                            Mostra a barra lateral para dispositivos mobile
                        </Sheet.Description>
                    </Sheet.Header>
                    {children}
                </Sheet.Content>
            </Sheet.Root>
        )
    }

    return (
        <div
            data-side={side}
            data-mobile='false'
            style={styles}
            className={classNames}
            {...props}
        >
            {children}
        </div>
    )
}
