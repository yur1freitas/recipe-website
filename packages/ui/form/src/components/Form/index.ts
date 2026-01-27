import type { FormTextareaProps } from './FormTextarea'
import type { FormSubmitProps } from './FormSubmit'
import type { FormPasswordProps } from './FormPassword'
import type { FormNumericInputProps } from './FormNumericInput'
import type { FormLabelProps } from './FormLabel'
import type { FormInputProps } from './FormInput'
import type { FormFieldProps } from './FormField'
import type { FormCaptchaProps } from './FormCaptcha'

import { FormTextarea } from './FormTextarea'
import { FormSubmit } from './FormSubmit'
import { FormPassword } from './FormPassword'
import { FormNumericInput } from './FormNumericInput'
import { FormLabel } from './FormLabel'
import { FormInput } from './FormInput'
import { FormFieldInfo } from './FormFieldInfo'
import { FormField } from './FormField'
import { FormCaptcha } from './FormCaptcha'

export const Form = {
    Field: FormField,
    FieldInfo: FormFieldInfo,
    Label: FormLabel,
    Input: FormInput,
    Submit: FormSubmit,
    Password: FormPassword,
    Captcha: FormCaptcha,
    Textarea: FormTextarea,
    NumericInput: FormNumericInput
}

export namespace FormProps {
    export type Field = FormFieldProps
    export type Label = FormLabelProps
    export type Input = FormInputProps
    export type Submit = FormSubmitProps
    export type Password = FormPasswordProps
    export type Captcha = FormCaptchaProps
    export type Textarea = FormTextareaProps
    export type NumericInput = FormNumericInputProps
}
