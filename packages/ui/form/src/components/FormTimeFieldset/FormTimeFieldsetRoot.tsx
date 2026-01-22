import type { Time } from '@utils/time'
import type { TimeFieldsetProps } from '@ui/core/TimeFieldset'

import { TimeFieldset } from '@ui/core/TimeFieldset'

import { useFieldContext } from '~/contexts/form'

export type FormTimeFieldsetRootProps = TimeFieldsetProps.Root

export function FormTimeFieldsetRoot(
    props: FormTimeFieldsetRootProps
): React.JSX.Element {
    const { state, handleChange } = useFieldContext<Time>()

    return (
        <TimeFieldset.Root
            value={state.value}
            onValueChange={handleChange}
            {...props}
        />
    )
}
