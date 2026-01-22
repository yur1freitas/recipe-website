import type { FormSelectTriggerProps } from './FormSelectTrigger'
import type { FormSelectRootProps } from './FormSelectRoot'

import { FormSelectTrigger } from './FormSelectTrigger'
import { FormSelectRoot } from './FormSelectRoot'

export const FormSelect = {
    Root: FormSelectRoot,
    Trigger: FormSelectTrigger
}

export namespace FormSelectProps {
    export type Root<
        TValue,
        TMultiple extends boolean | undefined = false
    > = FormSelectRootProps<TValue, TMultiple>
    export type Trigger = FormSelectTriggerProps
}
