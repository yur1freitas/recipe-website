import type { TimeFieldsetProps } from '@ui/core/TimeFieldset'

import { TimeFieldset } from '@ui/core/TimeFieldset'

import { isInvalidField } from '~/utils/isInvalidField'
import { useFieldContext } from '~/contexts/form'

export type FormTimeFieldsetInputProps = TimeFieldsetProps.Input

export function FormTimeFieldsetInput(
    props: FormTimeFieldsetInputProps
): React.JSX.Element {
    const { state, handleBlur } = useFieldContext<string>()

    const isInvalid = isInvalidField(state.meta)

    return (
        <TimeFieldset.Input
            aria-invalid={isInvalid}
            onBlur={handleBlur}
            {...props}
        />
    )
}
