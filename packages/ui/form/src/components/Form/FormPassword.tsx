import type { PasswordProps } from '@ui/core/Password'

import { Field } from '@ui/core/Field'

import { useFieldContext } from '~/contexts/form'

import { isInvalidField } from '~/utils/isInvalidField'
import { pickErrorMessage } from '~/utils/pickErrorMessage'

export type FormPasswordProps = PasswordProps.Input

export function FormPassword(props: FormPasswordProps): React.JSX.Element {
    const { name, state, handleBlur, handleChange } = useFieldContext<string>()

    const isInvalid = isInvalidField(state.meta)
    const errorMessage = pickErrorMessage(state.meta)

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
