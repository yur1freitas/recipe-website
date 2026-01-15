import { LoaderCircleIcon } from 'lucide-react'

export interface LoadingProps extends React.ComponentProps<'svg'> {
    label?: string
}

export function Loading({ label, ...props }: LoadingProps): React.JSX.Element {
    return (
        <div className='loading'>
            <LoaderCircleIcon {...props} />
            {label && <small>{label}</small>}
        </div>
    )
}
