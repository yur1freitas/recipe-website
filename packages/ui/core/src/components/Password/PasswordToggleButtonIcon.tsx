import { EyeIcon, EyeClosedIcon } from 'lucide-react'

import { usePasswordContext } from '~/hooks/usePasswordContext'

import type { IconProps } from '../Icon'
import { Icon } from '../Icon'

export type PasswordToggleButtonIconProps = Omit<IconProps, 'children'>

export function PasswordToggleButtonIcon({
    label = 'Trocar visibilidade da senha',
    ...props
}: PasswordToggleButtonIconProps): React.JSX.Element {
    const { isVisible } = usePasswordContext()

    return (
        <Icon {...props} label={label}>
            {isVisible ? <EyeIcon /> : <EyeClosedIcon />}
        </Icon>
    )
}
