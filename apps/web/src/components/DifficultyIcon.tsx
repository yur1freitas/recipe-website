import { ChefHatIcon, CoffeeIcon, CookingPotIcon } from 'lucide-react'

import type { DifficultyEnum } from '@core/cooking'
import { DIFFICULTY_NAMES } from '@core/cooking'

import type { IconProps } from '@ui/core/Icon'
import { Icon } from '@ui/core/Icon'

export const ICONS = {
    easy: <CoffeeIcon className='text-success' />,
    medium: <CookingPotIcon className='text-yellow-600' />,
    hard: <ChefHatIcon className='text-destructive' />
}

export interface DifficultyIconProps extends Omit<IconProps, 'children'> {
    type: DifficultyEnum
}

export function DifficultyIcon({
    type,
    ...props
}: DifficultyIconProps): React.JSX.Element {
    return (
        <Icon label={DIFFICULTY_NAMES[type]} {...props}>
            {ICONS[type]}
        </Icon>
    )
}
