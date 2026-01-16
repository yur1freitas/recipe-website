import type { TimeFieldLabelProps } from './TimeFieldLabel'
import type { TimeFieldInputProps } from './TimeFieldInput'
import type { TimeFieldGroupProps } from './TimeFieldGroup'
import type { TimeFieldRootProps } from './TimeFieldRoot'

import { TimeFieldLabel } from './TimeFieldLabel'
import { TimeFieldInput } from './TimeFieldInput'
import { TimeFieldGroup } from './TimeFieldGroup'
import { TimeFieldRoot } from './TimeFieldRoot'

export const TimeField = {
    Input: TimeFieldInput,
    Root: TimeFieldRoot,
    Label: TimeFieldLabel,
    Group: TimeFieldGroup
}

export namespace TimeFieldProps {
    export type Input = TimeFieldInputProps
    export type Root = TimeFieldRootProps
    export type Label = TimeFieldLabelProps
    export type Group = TimeFieldGroupProps
}
