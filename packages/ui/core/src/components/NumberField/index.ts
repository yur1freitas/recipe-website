import type { NumberFieldScrubAreaCursorProps } from './NumberFieldScrubAreaCursor'
import type { NumberFieldScrubAreaProps } from './NumberFieldScrubArea'
import type { NumberFieldIncrementProps } from './NumberFieldIncrement'
import type { NumberFieldDecrementProps } from './NumberFieldDecrement'
import type { NumberFieldLabelProps } from './NumberFieldLabel'
import type { NumberFieldInputProps } from './NumberFieldInput'
import type { NumberFieldGroupProps } from './NumberFieldGroup'
import type { NumberFieldRootProps } from './NumberFieldRoot'

import { NumberFieldScrubAreaCursor } from './NumberFieldScrubAreaCursor'
import { NumberFieldScrubArea } from './NumberFieldScrubArea'
import { NumberFieldIncrement } from './NumberFieldIncrement'
import { NumberFieldDecrement } from './NumberFieldDecrement'
import { NumberFieldLabel } from './NumberFieldLabel'
import { NumberFieldInput } from './NumberFieldInput'
import { NumberFieldGroup } from './NumberFieldGroup'
import { NumberFieldRoot } from './NumberFieldRoot'

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
