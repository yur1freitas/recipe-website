import { randId } from '@core/shared/mocks'

import type { ToolProps } from '~/tool/models/Tool'

import { randName } from './randName'
import { randAmount } from './randAmount'

export interface RandToolOptions {
    id?: string
    name?: string
    amount?: number
}

export function randTool(options?: RandToolOptions): ToolProps {
    return {
        id: options?.id ?? randId(),
        name: options?.name ?? randName({ type: 'product' }),
        amount: options?.amount ?? randAmount()
    }
}
