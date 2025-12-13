import type { ComponentProps } from 'react'

import { useFieldContext } from '~/contexts/form'

export type FieldLabelProps = ComponentProps<'label'>

export function FieldLabel({
    children,
    ...props
}: FieldLabelProps): React.JSX.Element {
    const field = useFieldContext<string>()

    return (
        <label htmlFor={field.name} className='label' {...props}>
            {children}
        </label>
    )
}
