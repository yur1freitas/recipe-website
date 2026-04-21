import type { ToolInput } from '@core/cooking'

import { Tool } from '@core/cooking'

import { Typography } from '@ui/core/Typography'

export interface ToolListItemInfoProps {
    data: ToolInput
}

export function ToolListItemInfo({ data }: ToolListItemInfoProps) {
    const tool = new Tool(data)

    return (
        <Typography.Paragraph className='truncate'>
            {tool.format()}
        </Typography.Paragraph>
    )
}
