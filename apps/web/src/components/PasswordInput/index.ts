import type { PasswordInputButtonProps } from './PasswordInputButton'
import type { PasswordInputFieldProps } from './PasswordInputField'
import type { PasswordInputRootProps } from './PasswordInputRoot'
import type { PasswordInputIconProps } from './PasswordInputIcon'

import { PasswordInputButton } from './PasswordInputButton'
import { PasswordInputField } from './PasswordInputField'
import { PasswordInputRoot } from './PasswordInputRoot'
import { PasswordInputIcon } from './PasswordInputIcon'

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
