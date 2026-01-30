export interface IngredientListItemProps {
    children?: React.ReactNode
}

export function IngredientListItem({
    children
}: IngredientListItemProps): React.JSX.Element {
    return (
        <li>
            <div className='flex items-center justify-between'>{children}</div>
        </li>
    )
}
