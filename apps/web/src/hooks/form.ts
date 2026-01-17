import { createFormHook } from '@tanstack/react-form'

import { formContext, fieldContext, Form } from '@ui/form'

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
        Password: Form.Password
    }
})
