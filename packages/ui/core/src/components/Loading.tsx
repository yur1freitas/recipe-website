import type { VariantProps } from 'tailwind-variants/lite'

import { LoaderCircleIcon } from 'lucide-react'
import { tv } from 'tailwind-variants/lite'

const loading = tv({
    base: 'loading',
    variants: {
        labelPos: {
            top: 'loading-label-top',
            bottom: 'loading-label-bottom',
            left: 'loading-label-left',
            right: 'loading-label-right'
        }
    }
})

export type LoadingProps = React.ComponentProps<'svg'> &
    VariantProps<typeof loading> & { label?: string }

export function Loading({
    label,
    labelPos,
    ...props
}: LoadingProps): React.JSX.Element {
    const classNames = loading({ labelPos })

    return (
        <div className={classNames}>
            <LoaderCircleIcon {...props} />
            {label && <small>{label}</small>}
        </div>
    )
}
