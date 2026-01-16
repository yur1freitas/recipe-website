import type { FieldsetRootProps } from './FieldsetRoot'
import type { FieldsetLegendProps } from './FieldsetLegend'

import { FieldsetRoot } from './FieldsetRoot'
import { FieldsetLegend } from './FieldsetLegend'

export const Fieldset = {
    Root: FieldsetRoot,
    Legend: FieldsetLegend
}

export namespace FieldsetProps {
    export type Root = FieldsetRootProps
    export type Legend = FieldsetLegendProps
}
