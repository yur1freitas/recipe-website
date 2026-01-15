import type { ComponentProps } from 'react'

import { useFieldContext } from '~/contexts/form'

import { PasswordInput } from '../PasswordInput'

export type FieldPasswordProps = ComponentProps<'input'>

export function FieldPassword(props: FieldPasswordProps): React.JSX.Element {
    const { name, state, handleBlur, handleChange } = useFieldContext<string>()

    const isInvalid = state.meta.isTouched && state.meta.isValid

    return (
        <PasswordInput.Root id={name}>
            <PasswordInput.Field
                name={name}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                aria-invalid={isInvalid}
                {...props}
            />
            <PasswordInput.Button>
                <PasswordInput.Icon />
            </PasswordInput.Button>
        </PasswordInput.Root>
    )
}
