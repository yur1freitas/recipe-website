import type { ProgressValueProps } from './ProgressValue'
import type { ProgressTrackProps } from './ProgressTrack'
import type { ProgressRootProps } from './ProgressRoot'
import type { ProgressLabelProps } from './ProgressLabel'
import type { ProgressIndicatorProps } from './ProgressIndicator'

import { ProgressValue } from './ProgressValue'
import { ProgressTrack } from './ProgressTrack'
import { ProgressRoot } from './ProgressRoot'
import { ProgressLabel } from './ProgressLabel'
import { ProgressIndicator } from './ProgressIndicator'

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
