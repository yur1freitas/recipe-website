import type { ComponentProps } from 'react'

export type FieldRootProps = ComponentProps<'div'>

export function FieldRoot({
    children,
    ...props
}: FieldRootProps): React.JSX.Element {
    return (
        <div className='flex flex-col gap-y-2' {...props}>
            {children}
        </div>
    )
}
