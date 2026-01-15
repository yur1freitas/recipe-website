import type { LucideProps } from 'lucide-react'

import { LoaderCircle } from 'lucide-react'

export interface LoadingProps extends LucideProps {
    label?: string
}

export function Loading({ label, ...props }: LoadingProps): React.JSX.Element {
    return (
        <div className='flex flex-col gap-y-1 text-center'>
            <LoaderCircle className='animate-spin' {...props} />
            {label && <small>{label}</small>}
        </div>
    )
}
