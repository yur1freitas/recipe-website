import { cx } from 'tailwind-variants/utils'

import { useSidebarContext } from '~/hooks/useSidebarContext'

import { SidebarInner } from './SidebarInner'
import { SidebarGap } from './SidebarGap'
import { SidebarContainer } from './SidebarContainer'

export interface SidebarContentProps extends React.ComponentProps<'aside'> {
    inset?: boolean
}

export function SidebarContent({
    inset = false,
    className,
    children,
    ...props
}: SidebarContentProps): React.JSX.Element {
    const classNames = cx('sidebar-content', className)

    const { isMobile } = useSidebarContext()

    if (isMobile) {
        return (
            <aside className={classNames} {...props}>
                {children}
            </aside>
        )
    }

    return (
        <aside data-inset={inset} className={classNames} {...props}>
            <SidebarGap data-inset={inset} />
            <SidebarContainer data-inset={inset}>
                <SidebarInner>{children}</SidebarInner>
            </SidebarContainer>
        </aside>
    )
}
