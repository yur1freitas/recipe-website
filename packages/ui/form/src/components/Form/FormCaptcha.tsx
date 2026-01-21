import type { CaptchaProps } from '@ui/captcha'

import { Captcha } from '@ui/captcha'
import { Field } from '@ui/core/Field'

import { useFieldContext } from '~/contexts/form'
import { isInvalidField } from '~/utils/isInvalidField'

export type FormCaptchaProps = CaptchaProps

export function FormCaptcha(props: FormCaptchaProps): React.JSX.Element {
    const { name, state, handleBlur, handleChange } = useFieldContext<string>()

    const isInvalid = isInvalidField(state.meta)
    const errorMessage = isInvalid ? state.meta.errors?.[0]?.message : ''

    return (
        <Field.Control
            render={
                <Captcha
                    {...props}
                    aria-invalid={isInvalid}
                    aria-errormessage={errorMessage}
                    name={name}
                    onBlur={handleBlur}
                    onSolve={handleChange}
                />
            }
        />
    )
}
