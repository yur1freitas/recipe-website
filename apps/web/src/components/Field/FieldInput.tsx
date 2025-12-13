import type { ComponentProps } from 'react'

import { useFieldContext } from '~/contexts/form'

export type FieldInputProps = ComponentProps<'input'>

export function FieldInput(props: FieldInputProps): React.JSX.Element {
    const { name, state, handleBlur, handleChange } = useFieldContext<string>()

    const isInvalid = state.meta.isTouched && state.meta.isValid

    return (
        <input
            id={name}
            name={name}
            value={state.value}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e.target?.value)}
            aria-invalid={isInvalid}
            className='input input-md w-full'
            {...props}
        />
    )
}
