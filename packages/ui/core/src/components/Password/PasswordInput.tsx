import { useRender } from '@base-ui/react/use-render'
import { cx } from 'tailwind-variants/utils'

import { usePasswordContext } from '~/hooks/usePasswordContext'

export type PasswordInputProps = Omit<
    useRender.ComponentProps<'input'>,
    'id' | 'type'
>

export function PasswordInputField({
    render,
    className,
    ...props
}: PasswordInputProps): React.JSX.Element {
    const classNames = cx('password-input', className)

    const { inputId, isVisible } = usePasswordContext()

    const type = isVisible ? 'text' : 'password'

    const element = useRender({
        render,
        defaultTagName: 'input',
        props: { ...props, id: inputId, className: classNames, type }
    })

    return element
}
