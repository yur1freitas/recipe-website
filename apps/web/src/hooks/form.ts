import { createFormHook } from '@tanstack/react-form'

import {
    formContext,
    fieldContext,
    Form,
    FormSelect,
    FormTimeFieldset,
    FormNumberField
} from '@ui/form'

export const { withForm, withFieldGroup, useAppForm } = createFormHook({
    formContext,
    fieldContext,
    formComponents: {
        Submit: Form.Submit
    },
    fieldComponents: {
        Root: Form.Field,
        Label: Form.Label,
        Input: Form.Input,
        Info: Form.FieldInfo,
        Captcha: Form.Captcha,
        Password: Form.Password,
        Textarea: Form.Textarea,
        Select: FormSelect.Root,
        SelectTrigger: FormSelect.Trigger,
        TimeFieldset: FormTimeFieldset.Root,
        TimeFieldsetInput: FormTimeFieldset.Input,
        NumberField: FormNumberField.Root,
        NumberFieldInput: FormNumberField.Input,
        NumbericInput: Form.NumericInput
    }
})
