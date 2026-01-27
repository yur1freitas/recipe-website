import { Field } from '@ui/core/Field'
import type { CaptchaProps } from '@ui/captcha'
import { Captcha } from '@ui/captcha'

import { pickErrorMessage } from '~/utils/pickErrorMessage'
import { isInvalidField } from '~/utils/isInvalidField'
import { useFieldContext } from '~/contexts/form'

export type FormCaptchaProps = CaptchaProps

export function FormCaptcha(props: FormCaptchaProps): React.JSX.Element {
    const { name, state, handleBlur, handleChange } = useFieldContext<string>()

    const isInvalid = isInvalidField(state.meta)
    const errorMessage = pickErrorMessage(state.meta)

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
