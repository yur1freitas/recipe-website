import { useCallback } from 'react'

import { useSidebarContext } from '~/hooks/useSidebarContext'

import type { ButtonProps } from '../Button'

import { Button } from '../Button'

export type SidebarTriggerProps = ButtonProps

export function SidebarTrigger({
    onClick,
    ...props
}: SidebarTriggerProps): React.JSX.Element {
    const { toggleSidebar } = useSidebarContext()

    const handleClick: NonNullable<SidebarTriggerProps['onClick']> =
        useCallback(
            (event) => {
                onClick?.(event)
                toggleSidebar()
            },
            [toggleSidebar, onClick]
        )

    return <Button onClick={handleClick} {...props} />
}
