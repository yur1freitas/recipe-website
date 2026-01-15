import type { FieldValidityProps } from './FieldValidity'
import type { FieldRootProps } from './FieldRoot'
import type { FieldPassworProps } from './FieldPassword'
import type { FieldLabelProps } from './FieldLabel'
import type { FieldErrorProps } from './FieldError'
import type { FieldDescriptionProps } from './FieldDescription'
import type { FieldControlProps } from './FieldControl'

import { FieldValidity } from './FieldValidity'
import { FieldRoot } from './FieldRoot'
import { FieldPassword } from './FieldPassword'
import { FieldLabel } from './FieldLabel'
import { FieldError } from './FieldError'
import { FieldDescription } from './FieldDescription'
import { FieldControl } from './FieldControl'

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
