import type { PasswordInputButtonProps } from './PasswordInputButton'
import type { PasswordInputFieldProps } from './PasswordInputField'
import type { PasswordInputIconProps } from './PasswordInputIcon'
import type { PasswordInputRootProps } from './PasswordInputRoot'

import { PasswordInputButton } from './PasswordInputButton'
import { PasswordInputField } from './PasswordInputField'
import { PasswordInputIcon } from './PasswordInputIcon'
import { PasswordInputRoot } from './PasswordInputRoot'

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
