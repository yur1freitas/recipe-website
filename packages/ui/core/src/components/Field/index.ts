import type { FieldDescriptionProps } from './FieldDescription'
import type { FieldValidityProps } from './FieldValidity'
import type { FieldPassworProps } from './FieldPassword'
import type { FieldControlProps } from './FieldControl'
import type { FieldLabelProps } from './FieldLabel'
import type { FieldErrorProps } from './FieldError'
import type { FieldRootProps } from './FieldRoot'

import { FieldDescription } from './FieldDescription'
import { FieldValidity } from './FieldValidity'
import { FieldPassword } from './FieldPassword'
import { FieldControl } from './FieldControl'
import { FieldLabel } from './FieldLabel'
import { FieldError } from './FieldError'
import { FieldRoot } from './FieldRoot'

export const Field = {
    Root: FieldRoot,
    Control: FieldControl,
    Label: FieldLabel,
    Validity: FieldValidity,
    Error: FieldError,
    Description: FieldDescription,
    Password: FieldPassword
}

export namespace FieldProps {
    export type Root = FieldRootProps
    export type Control = FieldControlProps
    export type Label = FieldLabelProps
    export type Validity = FieldValidityProps
    export type Error = FieldErrorProps
    export type Description = FieldDescriptionProps
    export type Password = FieldPassworProps
}
