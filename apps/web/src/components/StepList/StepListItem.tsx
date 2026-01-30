import { Sortable } from '@ui/dnd'

export interface StepListItemProps {
    id: string | number
    children?: React.ReactNode
}

export function StepListItem({
    id,
    children
}: StepListItemProps): React.JSX.Element {
    return (
        <Sortable.Item
            id={id}
            style={{ transition: 'none' }}
            render={
                <li>
                    <div className='flex items-end justify-between'>
                        {children}
                    </div>
                </li>
            }
        />
    )
}
