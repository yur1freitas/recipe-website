import type { TimeFieldsetLegendProps } from './TimeFieldsetLegend'
import type { TimeFieldsetInputProps } from './TimeFieldsetInput'
import type { TimeFieldsetGroupProps } from './TimeFieldsetGroup'
import type { TimeFieldsetRootProps } from './TimeFieldsetRoot'
import type { TimeFieldsetFieldProps } from './TimeFieldsetField'
import type { TimeFieldsetLabelProps } from './TimeFieldsetLabel'

import { TimeFieldsetLegend } from './TimeFieldsetLegend'
import { TimeFieldsetInput } from './TimeFieldsetInput'
import { TimeFieldsetGroup } from './TimeFieldsetGroup'
import { TimeFieldsetRoot } from './TimeFieldsetRoot'
import { TimeFieldsetField } from './TimeFieldsetField'
import { TimeFieldsetLabel } from './TimeFieldsetLabel'

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
