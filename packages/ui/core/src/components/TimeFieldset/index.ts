import type { TimeFieldsetLabelProps } from './TimeFieldsetLabel'
import type { TimeFieldsetInputProps } from './TimeFieldsetInput'
import type { TimeFieldsetGroupProps } from './TimeFieldsetGroup'
import type { TimeFieldsetRootProps } from './TimeFieldsetRoot'

import { TimeFieldsetLabel } from './TimeFieldsetLabel'
import { TimeFieldsetInput } from './TimeFieldsetInput'
import { TimeFieldsetGroup } from './TimeFieldsetGroup'
import { TimeFieldsetRoot } from './TimeFieldsetRoot'

export const TimeFieldset = {
    Input: TimeFieldsetInput,
    Root: TimeFieldsetRoot,
    Label: TimeFieldsetLabel,
    Group: TimeFieldsetGroup
}

export namespace TimeFieldsetProps {
    export type Input = TimeFieldsetInputProps
    export type Root = TimeFieldsetRootProps
    export type Label = TimeFieldsetLabelProps
    export type Group = TimeFieldsetGroupProps
}
