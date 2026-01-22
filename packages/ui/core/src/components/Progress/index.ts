import type { ProgressLabelProps } from './ProgressLabel'
import type { ProgressIndicatorProps } from './ProgressIndicator'
import type { ProgressValueProps } from './ProgressValue'
import type { ProgressRootProps } from './ProgressRoot'
import type { ProgressTrackProps } from './ProgressTrack'

import { ProgressLabel } from './ProgressLabel'
import { ProgressIndicator } from './ProgressIndicator'
import { ProgressRoot } from './ProgressRoot'
import { ProgressTrack } from './ProgressTrack'
import { ProgressValue } from './ProgressValue'

export const Progress = {
    Track: ProgressTrack,
    Root: ProgressRoot,
    Label: ProgressLabel,
    Value: ProgressValue,
    Indicator: ProgressIndicator
}

export namespace ProgressProps {
    export type Label = ProgressLabelProps
    export type Track = ProgressTrackProps
    export type Root = ProgressRootProps
    export type Value = ProgressValueProps
    export type Indicator = ProgressIndicatorProps
}
