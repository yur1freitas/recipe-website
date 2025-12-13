export interface ActionProps {
    state: ActionState
    isPending?: boolean
}

export function Action({
    state,
    isPending = false
}: ActionProps): React.JSX.Element | null {
    if (isPending) {
        return <small>Processando...</small>
    }

    if (state.status === 'failed') {
        return <em className='text-error not-italic'>{state.error}</em>
    }

    return null
}
