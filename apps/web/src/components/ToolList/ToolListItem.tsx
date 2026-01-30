export interface ToolListItemProps {
    children?: React.ReactNode
}

export function ToolListItem({
    children
}: ToolListItemProps): React.JSX.Element {
    return (
        <li>
            <div className='flex items-bottom justify-between'>{children}</div>
        </li>
    )
}
