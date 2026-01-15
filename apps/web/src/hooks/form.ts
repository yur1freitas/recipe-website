import { createFormHook } from '@tanstack/react-form'

import { fieldContext, formContext } from '~/contexts/form'
import { FormSubmit } from '~/components/Form/FormSubmit'
import { namedLazy } from '~/utils/namedLazy'

const FieldRoot = namedLazy(
    () => import('~/components/Field/FieldRoot'),
    'FieldRoot'
)
const FieldLabel = namedLazy(
    () => import('~/components/Field/FieldLabel'),
    'FieldLabel'
)
const FieldInput = namedLazy(
    () => import('~/components/Field/FieldInput'),
    'FieldInput'
)
const FieldInfo = namedLazy(
    () => import('~/components/Field/FieldInfo'),
    'FieldInfo'
)
const FieldCaptcha = namedLazy(
    () => import('~/components/Field/FieldCaptcha'),
    'FieldCaptcha'
)
const FieldPassword = namedLazy(
    () => import('~/components/Field/FieldPassword'),
    'FieldPassword'
)

export const { withForm, withFieldGroup, useAppForm } = createFormHook({
    formContext,
    fieldContext,
    formComponents: {
        Submit: FormSubmit
    },
    fieldComponents: {
        Root: FieldRoot,
        Label: FieldLabel,
        Input: FieldInput,
        Info: FieldInfo,
        Captcha: FieldCaptcha,
        Password: FieldPassword
    }
})
