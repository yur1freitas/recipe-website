import type { DragHandler } from '@ui/dnd'

import { Sortable } from '@ui/dnd'
import { Typography } from '@ui/core/Typography'
import { ScrollArea } from '@ui/core/ScrollArea'

export interface StepListRootProps {
    items: (number | string)[]
    children?: React.ReactNode
    onItemMove?: DragHandler.End
}

export function StepListRoot({
    items,
    children,
    onItemMove
}: StepListRootProps): React.JSX.Element {
    return (
        <ScrollArea.Root className='mb-2 h-64 w-full'>
            <ScrollArea.Viewport>
                <Sortable.Root
                    axis='y'
                    items={items}
                    onDragEnd={onItemMove}
                    restrictToAxis
                >
                    <ScrollArea.Content style={{ minWidth: 0 }}>
                        <Typography.List
                            variant='decimal'
                            className='pr-6 list-none'
                        >
                            {children}
                        </Typography.List>
                    </ScrollArea.Content>
                </Sortable.Root>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
}
