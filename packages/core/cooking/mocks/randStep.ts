import { randId } from '@core/shared/mocks'

import type { StepProps } from '~/step/models/Step'

import { randDescription } from './randDescription'
import { randOrder } from './randOrder'

export interface RandStepOptions {
    id?: string
    order?: number
    description?: string
}

export function randStep(options?: RandStepOptions): StepProps {
    return {
        id: options?.id ?? randId(),
        order: options?.order ?? randOrder(),
        description: options?.description ?? randDescription()
    }
}
