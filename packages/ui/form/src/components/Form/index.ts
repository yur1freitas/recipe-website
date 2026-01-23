import type { FormPasswordProps } from './FormPassword'
import type { FormTextareaProps } from './FormTextarea'
import type { FormCaptchaProps } from './FormCaptcha'
import type { FormSubmitProps } from './FormSubmit'
import type { FormFieldProps } from './FormField'
import type { FormInputProps } from './FormInput'
import type { FormLabelProps } from './FormLabel'

import { FormFieldInfo } from './FormFieldInfo'
import { FormPassword } from './FormPassword'
import { FormTextarea } from './FormTextarea'
import { FormCaptcha } from './FormCaptcha'
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
    Password: FormPassword,
    Captcha: FormCaptcha,
    Textarea: FormTextarea
}

export namespace FormProps {
    export type Field = FormFieldProps
    export type Label = FormLabelProps
    export type Input = FormInputProps
    export type Submit = FormSubmitProps
    export type Password = FormPasswordProps
    export type Captcha = FormCaptchaProps
    export type Textarea = FormTextareaProps
}
