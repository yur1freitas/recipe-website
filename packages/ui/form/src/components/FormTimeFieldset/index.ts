import type { FormTimeFieldsetRootProps } from './FormTimeFieldsetRoot'
import type { FormTimeFieldsetInputProps } from './FormTimeFieldsetInput'

import { FormTimeFieldsetRoot } from './FormTimeFieldsetRoot'
import { FormTimeFieldsetInput } from './FormTimeFieldsetInput'

export const FormTimeFieldset = {
    Root: FormTimeFieldsetRoot,
    Input: FormTimeFieldsetInput
}

export namespace FormTimeFieldsetProps {
    export type Root = FormTimeFieldsetRootProps
    export type Input = FormTimeFieldsetInputProps
}
