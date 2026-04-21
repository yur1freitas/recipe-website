import type { StepInput } from '@core/cooking'

import { Step } from '@core/cooking'

import { Sortable } from '@ui/dnd'
import { Typography } from '@ui/core/Typography'

export interface StepListItemInfoProps {
    data: StepInput
}

export function StepListItemInfo({ data }: StepListItemInfoProps) {
    const step = new Step(data)

    return (
        <Sortable.DragHandle className='overflow-hidden'>
            <Typography.Paragraph className='truncate'>
                {step.format()}
            </Typography.Paragraph>
        </Sortable.DragHandle>
    )
}
