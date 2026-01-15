import type { NumberFieldScrubAreaCursorProps } from './NumberFieldScrubAreaCursor'
import type { NumberFieldScrubAreaProps } from './NumberFieldScrubArea'
import type { NumberFieldRootProps } from './NumberFieldRoot'
import type { NumberFieldLabelProps } from './NumberFieldLabel'
import type { NumberFieldInputProps } from './NumberFieldInput'
import type { NumberFieldIncrementProps } from './NumberFieldIncrement'
import type { NumberFieldGroupProps } from './NumberFieldGroup'
import type { NumberFieldDecrementProps } from './NumberFieldDecrement'

import { NumberFieldScrubAreaCursor } from './NumberFieldScrubAreaCursor'
import { NumberFieldScrubArea } from './NumberFieldScrubArea'
import { NumberFieldRoot } from './NumberFieldRoot'
import { NumberFieldLabel } from './NumberFieldLabel'
import { NumberFieldInput } from './NumberFieldInput'
import { NumberFieldIncrement } from './NumberFieldIncrement'
import { NumberFieldGroup } from './NumberFieldGroup'
import { NumberFieldDecrement } from './NumberFieldDecrement'

export const NumberField = {
    Root: NumberFieldRoot,
    Increment: NumberFieldIncrement,
    Decrement: NumberFieldDecrement,
    Input: NumberFieldInput,
    Label: NumberFieldLabel,
    Group: NumberFieldGroup,
    ScrubArea: NumberFieldScrubArea,
    ScrubAreaCursor: NumberFieldScrubAreaCursor
}

export namespace NumberFieldProps {
    export type Label = NumberFieldLabelProps
    export type Root = NumberFieldRootProps
    export type Increment = NumberFieldIncrementProps
    export type Decrement = NumberFieldDecrementProps
    export type Input = NumberFieldInputProps
    export type Group = NumberFieldGroupProps
    export type ScrubArea = NumberFieldScrubAreaProps
    export type ScrubAreaCursor = NumberFieldScrubAreaCursorProps
}
