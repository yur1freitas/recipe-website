import type { PasswordInputRootProps } from './PasswordInputRoot'
import type { PasswordInputIconProps } from './PasswordInputIcon'
import type { PasswordInputFieldProps } from './PasswordInputField'
import type { PasswordInputButtonProps } from './PasswordInputButton'

import { PasswordInputRoot } from './PasswordInputRoot'
import { PasswordInputIcon } from './PasswordInputIcon'
import { PasswordInputField } from './PasswordInputField'
import { PasswordInputButton } from './PasswordInputButton'

export const PasswordInput = {
    Root: PasswordInputRoot,
    Field: PasswordInputField,
    Icon: PasswordInputIcon,
    Button: PasswordInputButton
}

export type {
    PasswordInputButtonProps,
    PasswordInputFieldProps,
    PasswordInputIconProps,
    PasswordInputRootProps
}
