import type { TimeFieldsetRootProps } from './TimeFieldsetRoot'
import type { TimeFieldsetLegendProps } from './TimeFieldsetLegend'
import type { TimeFieldsetLabelProps } from './TimeFieldsetLabel'
import type { TimeFieldsetInputProps } from './TimeFieldsetInput'
import type { TimeFieldsetGroupProps } from './TimeFieldsetGroup'
import type { TimeFieldsetFieldProps } from './TimeFieldsetField'

import { TimeFieldsetRoot } from './TimeFieldsetRoot'
import { TimeFieldsetLegend } from './TimeFieldsetLegend'
import { TimeFieldsetLabel } from './TimeFieldsetLabel'
import { TimeFieldsetInput } from './TimeFieldsetInput'
import { TimeFieldsetGroup } from './TimeFieldsetGroup'
import { TimeFieldsetField } from './TimeFieldsetField'

export const TimeFieldset = {
    Input: TimeFieldsetInput,
    Root: TimeFieldsetRoot,
    Legend: TimeFieldsetLegend,
    Group: TimeFieldsetGroup,
    Field: TimeFieldsetField,
    Label: TimeFieldsetLabel
}

export namespace TimeFieldsetProps {
    export type Input = TimeFieldsetInputProps
    export type Root = TimeFieldsetRootProps
    export type Legend = TimeFieldsetLegendProps
    export type Group = TimeFieldsetGroupProps
    export type Field = TimeFieldsetFieldProps
    export type Label = TimeFieldsetLabelProps
}
