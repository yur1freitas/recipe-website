import type { FormSubmitProps } from './FormSubmit'
import type { FormFieldProps } from './FormField'
import type { FormInputProps } from './FormInput'

import { FormField } from './FormField'
import { FormSubmit } from './FormSubmit'
import { FormInput } from './FormInput'

export const Form = {
    Field: FormField,
    Input: FormInput,
    Submit: FormSubmit
}

export namespace FormProps {
    export type Field = FormFieldProps
    export type Input = FormInputProps
    export type Submit = FormSubmitProps
}
