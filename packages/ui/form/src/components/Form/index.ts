import type { FormPasswordProps } from './FormPassword'
import type { FormSubmitProps } from './FormSubmit'
import type { FormFieldProps } from './FormField'
import type { FormInputProps } from './FormInput'
import type { FormLabelProps } from './FormLabel'

import { FormFieldInfo } from './FormFieldInfo'
import { FormPassword } from './FormPassword'
import { FormSubmit } from './FormSubmit'
import { FormField } from './FormField'
import { FormInput } from './FormInput'
import { FormLabel } from './FormLabel'

export const Form = {
    Field: FormField,
    FieldInfo: FormFieldInfo,
    Label: FormLabel,
    Input: FormInput,
    Submit: FormSubmit,
    Password: FormPassword
}

export namespace FormProps {
    export type Field = FormFieldProps
    export type Label = FormLabelProps
    export type Input = FormInputProps
    export type Submit = FormSubmitProps
    export type Password = FormPasswordProps
}
