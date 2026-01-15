import type { PasswordProps } from '@ui/core/Password'

import { Field } from '@ui/core/Field'

import { useFieldContext } from '~/contexts/form'

export type FormPasswordProps = PasswordProps.Input

export function FormPassword(props: FormPasswordProps): React.JSX.Element {
    const { name, state, handleBlur, handleChange } = useFieldContext<string>()

    const isInvalid = state.meta.isTouched && !state.meta.isValid
    const errorMessage = isInvalid ? state.meta.errors?.[0]?.message : ''

    return (
        <Field.Password
            {...props}
            aria-invalid={isInvalid}
            aria-errormessage={errorMessage}
            name={name}
            value={state.value}
            onBlur={handleBlur}
            onValueChange={handleChange}
        />
    )
}
