import { Typography } from '@ui/core/Typography'
import { ScrollArea } from '@ui/core/ScrollArea'

export interface IngredientListRootProps {
    children?: React.ReactNode
}

export function IngredientListRoot({
    children
}: IngredientListRootProps): React.JSX.Element {
    return (
        <ScrollArea.Root className='mb-2 h-64 w-full'>
            <ScrollArea.Viewport>
                <ScrollArea.Content style={{ minWidth: 0 }}>
                    <Typography.List className='pr-6 list-none'>
                        {children}
                    </Typography.List>
                </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
}
