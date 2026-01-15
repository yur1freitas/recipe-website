import { useFieldContext } from '~/contexts/form'

import type { CaptchaProps } from '../Captcha'

import { Captcha } from '../Captcha'

export type FieldCaptchaProps = CaptchaProps

export function FieldCaptcha(props: FieldCaptchaProps): React.JSX.Element {
    const { name, handleBlur, handleChange } = useFieldContext<string>()

    return (
        <Captcha
            id={name}
            name={name}
            onBlur={handleBlur}
            onSolve={(token) => handleChange(token)}
            {...props}
        />
    )
}
