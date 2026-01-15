import type { FormSubmitProps } from './FormSubmit'
import type { FormFieldProps } from './FormField'
import type { FormInputProps } from './FormInput'
import type { FormLabelProps } from './FormLabel'

import { FormField } from './FormField'
import { FormSubmit } from './FormSubmit'
import { FormInput } from './FormInput'
import { FormLabel } from './FormLabel'

export const Form = {
    Field: FormField,
    Label: FormLabel,
    Input: FormInput,
    Submit: FormSubmit
}

export namespace FormProps {
    export type Field = FormFieldProps
    export type Label = FormLabelProps
    export type Input = FormInputProps
    export type Submit = FormSubmitProps
}
