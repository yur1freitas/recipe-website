import type { FormNumberFieldRootProps } from './FormNumberFieldRoot'
import type { FormNumberFieldInputProps } from './FormNumberFieldInput'

import { FormNumberFieldRoot } from './FormNumberFieldRoot'
import { FormNumberFieldInput } from './FormNumberFieldInput'

export const FormNumberField = {
    Root: FormNumberFieldRoot,
    Input: FormNumberFieldInput
}

export namespace FormNumberFieldProps {
    export type Root = FormNumberFieldRootProps
    export type Input = FormNumberFieldInputProps
}
