import type { TimeFieldsetLegendProps } from './TimeFieldsetLegend'
import type { TimeFieldsetInputProps } from './TimeFieldsetInput'
import type { TimeFieldsetGroupProps } from './TimeFieldsetGroup'
import type { TimeFieldsetRootProps } from './TimeFieldsetRoot'

import { TimeFieldsetLegend } from './TimeFieldsetLegend'
import { TimeFieldsetInput } from './TimeFieldsetInput'
import { TimeFieldsetGroup } from './TimeFieldsetGroup'
import { TimeFieldsetRoot } from './TimeFieldsetRoot'

export const TimeFieldset = {
    Input: TimeFieldsetInput,
    Root: TimeFieldsetRoot,
    Legend: TimeFieldsetLegend,
    Group: TimeFieldsetGroup
}

export namespace TimeFieldsetProps {
    export type Input = TimeFieldsetInputProps
    export type Root = TimeFieldsetRootProps
    export type Legend = TimeFieldsetLegendProps
    export type Group = TimeFieldsetGroupProps
}
