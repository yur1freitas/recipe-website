import type { SelectProps } from '@ui/core/Select'

import { Select } from '@ui/core/Select'

import { pickErrorMessage } from '~/utils/pickErrorMessage'
import { isInvalidField } from '~/utils/isInvalidField'
import { useFieldContext } from '~/contexts/form'

export type FormSelectTriggerProps = SelectProps.TriggerProps

export function FormSelectTrigger(
    props: FormSelectTriggerProps
): React.JSX.Element {
    const { state, handleBlur } = useFieldContext<string>()

    const isInvalid = isInvalidField(state.meta)
    const errorMessage = pickErrorMessage(state.meta)

    return (
        <Select.Trigger
            aria-invalid={isInvalid}
            aria-errormessage={errorMessage}
            onBlur={handleBlur}
            {...props}
        />
    )
}
