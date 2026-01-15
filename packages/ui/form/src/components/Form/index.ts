import type { FormSubmitProps } from './FormSubmit'
import type { FormFieldProps } from './FormField'

import { FormField } from './FormField'
import { FormSubmit } from './FormSubmit'

export const Form = {
    Field: FormField,
    Submit: FormSubmit
}

export namespace FormProps {
    export type Field = FormFieldProps
    export type Submit = FormSubmitProps
}
