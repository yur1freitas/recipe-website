import type { AutocompleteCollectionProps } from './AutocompleteCollection'
import type { AutocompleteGroupLabelProps } from './AutocompleteGroupLabel'
import type { AutocompletePositionerProps } from './AutocompletePositioner'
import type { AutocompleteSeparatorProps } from './AutocompleteSeparator'
import type { AutocompleteBackdropProps } from './AutocompleteBackdrop'
import type { AutocompleteTriggerProps } from './AutocompleteTrigger'
import type { AutocompletePortalProps } from './AutocompletePortal'
import type { AutocompleteStatusProps } from './AutocompleteStatus'
import type { AutocompleteClearProps } from './AutocompleteClear'
import type { AutocompleteEmptyProps } from './AutocompleteEmpty'
import type { AutocompleteGroupProps } from './AutocompleteGroup'
import type { AutocompleteInputProps } from './AutocompleteInput'
import type { AutocompletePopupProps } from './AutocompletePopup'
import type { AutocompleteValueProps } from './AutocompleteValue'
import type { AutocompleteIconProps } from './AutocompleteIcon'
import type { AutocompleteItemProps } from './AutocompleteItem'
import type { AutocompleteListProps } from './AutocompleteList'
import type { AutocompleteRootProps } from './AutocompleteRoot'
import type { AutocompleteRowProps } from './AutocompleteRow'

import { AutocompleteCollection } from './AutocompleteCollection'
import { AutocompleteGroupLabel } from './AutocompleteGroupLabel'
import { AutocompletePositioner } from './AutocompletePositioner'
import { AutocompleteSeparator } from './AutocompleteSeparator'
import { AutocompleteBackdrop } from './AutocompleteBackdrop'
import { AutocompleteTrigger } from './AutocompleteTrigger'
import { AutocompletePortal } from './AutocompletePortal'
import { AutocompleteStatus } from './AutocompleteStatus'
import { AutocompleteClear } from './AutocompleteClear'
import { AutocompleteEmpty } from './AutocompleteEmpty'
import { AutocompleteGroup } from './AutocompleteGroup'
import { AutocompleteInput } from './AutocompleteInput'
import { AutocompletePopup } from './AutocompletePopup'
import { AutocompleteValue } from './AutocompleteValue'
import { AutocompleteIcon } from './AutocompleteIcon'
import { AutocompleteItem } from './AutocompleteItem'
import { AutocompleteList } from './AutocompleteList'
import { AutocompleteRoot } from './AutocompleteRoot'
import { AutocompleteRow } from './AutocompleteRow'

export const Autocomplete = {
    Backdrop: AutocompleteBackdrop,
    Clear: AutocompleteClear,
    Collection: AutocompleteCollection,
    Empty: AutocompleteEmpty,
    Group: AutocompleteGroup,
    GroupLabel: AutocompleteGroupLabel,
    Icon: AutocompleteIcon,
    Input: AutocompleteInput,
    Item: AutocompleteItem,
    List: AutocompleteList,
    Popup: AutocompletePopup,
    Portal: AutocompletePortal,
    Positioner: AutocompletePositioner,
    Root: AutocompleteRoot,
    Row: AutocompleteRow,
    Separator: AutocompleteSeparator,
    Status: AutocompleteStatus,
    Trigger: AutocompleteTrigger,
    Value: AutocompleteValue
}

export namespace AutocompleteProps {
    export type Backdrop = AutocompleteBackdropProps
    export type Clear = AutocompleteClearProps
    export type Collection = AutocompleteCollectionProps
    export type Empty = AutocompleteEmptyProps
    export type Group = AutocompleteGroupProps
    export type GroupLabel = AutocompleteGroupLabelProps
    export type Icon = AutocompleteIconProps
    export type Input = AutocompleteInputProps
    export type Item = AutocompleteItemProps
    export type List = AutocompleteListProps
    export type Popup = AutocompletePopupProps
    export type Portal = AutocompletePortalProps
    export type Positioner = AutocompletePositionerProps
    export type Root<ItemValue> = AutocompleteRootProps<ItemValue>
    export type Row = AutocompleteRowProps
    export type Separator = AutocompleteSeparatorProps
    export type Status = AutocompleteStatusProps
    export type Trigger = AutocompleteTriggerProps
    export type Value = AutocompleteValueProps
}
