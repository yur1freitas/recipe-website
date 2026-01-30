export interface RecipePreviewRootProps {
    children?: React.ReactNode
    onSubmit: React.FormEventHandler<HTMLFormElement>
}

export function RecipePreviewRoot({
    children,
    onSubmit
}: RecipePreviewRootProps): React.JSX.Element {
    return (
        <form className='flex flex-col gap-y-4' onSubmit={onSubmit}>
            {children}
        </form>
    )
}
