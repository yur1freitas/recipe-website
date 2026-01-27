import type { AutocompleteValueProps } from './AutocompleteValue'
import type { AutocompleteTriggerProps } from './AutocompleteTrigger'
import type { AutocompleteStatusProps } from './AutocompleteStatus'
import type { AutocompleteSeparatorProps } from './AutocompleteSeparator'
import type { AutocompleteRowProps } from './AutocompleteRow'
import type { AutocompleteRootProps } from './AutocompleteRoot'
import type { AutocompletePositionerProps } from './AutocompletePositioner'
import type { AutocompletePortalProps } from './AutocompletePortal'
import type { AutocompletePopupProps } from './AutocompletePopup'
import type { AutocompleteListProps } from './AutocompleteList'
import type { AutocompleteItemProps } from './AutocompleteItem'
import type { AutocompleteInputProps } from './AutocompleteInput'
import type { AutocompleteIconProps } from './AutocompleteIcon'
import type { AutocompleteGroupLabelProps } from './AutocompleteGroupLabel'
import type { AutocompleteGroupProps } from './AutocompleteGroup'
import type { AutocompleteEmptyProps } from './AutocompleteEmpty'
import type { AutocompleteCollectionProps } from './AutocompleteCollection'
import type { AutocompleteClearProps } from './AutocompleteClear'
import type { AutocompleteBackdropProps } from './AutocompleteBackdrop'

import { AutocompleteValue } from './AutocompleteValue'
import { AutocompleteTrigger } from './AutocompleteTrigger'
import { AutocompleteStatus } from './AutocompleteStatus'
import { AutocompleteSeparator } from './AutocompleteSeparator'
import { AutocompleteRow } from './AutocompleteRow'
import { AutocompleteRoot } from './AutocompleteRoot'
import { AutocompletePositioner } from './AutocompletePositioner'
import { AutocompletePortal } from './AutocompletePortal'
import { AutocompletePopup } from './AutocompletePopup'
import { AutocompleteList } from './AutocompleteList'
import { AutocompleteItem } from './AutocompleteItem'
import { AutocompleteInput } from './AutocompleteInput'
import { AutocompleteIcon } from './AutocompleteIcon'
import { AutocompleteGroupLabel } from './AutocompleteGroupLabel'
import { AutocompleteGroup } from './AutocompleteGroup'
import { AutocompleteEmpty } from './AutocompleteEmpty'
import { AutocompleteCollection } from './AutocompleteCollection'
import { AutocompleteClear } from './AutocompleteClear'
import { AutocompleteBackdrop } from './AutocompleteBackdrop'

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
