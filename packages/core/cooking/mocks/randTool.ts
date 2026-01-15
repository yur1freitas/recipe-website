import { randId } from '@core/shared/mocks'

import type { ToolProps } from '~/tool/models/Tool'

import { randAmount } from './randAmount'
import { randName } from './randName'

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
