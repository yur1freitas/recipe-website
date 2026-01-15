import type { PasswordToggleButtonIconProps } from './PasswordToggleButtonIcon'
import type { PasswordToggleButtonProps } from './PasswordToggleButton'
import type { PasswordRootProps } from './PasswordRoot'
import type { PasswordInputProps } from './PasswordInput'

import { PasswordToggleButtonIcon } from './PasswordToggleButtonIcon'
import { PasswordToggleButton } from './PasswordToggleButton'
import { PasswordRoot } from './PasswordRoot'
import { PasswordInputField } from './PasswordInput'

export const Password = {
    Root: PasswordRoot,
    Input: PasswordInputField,
    ToggleButton: PasswordToggleButton,
    ToggleButtonIcon: PasswordToggleButtonIcon
}

export namespace PasswordProps {
    export type Root = PasswordRootProps
    export type Input = PasswordInputProps
    export type ToggleButton = PasswordToggleButtonProps
    export type ToggleButtonIcon = PasswordToggleButtonIconProps
}
