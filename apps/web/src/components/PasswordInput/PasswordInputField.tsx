import { useEffect } from 'react'

import { usePasswordInput } from './PasswordInputRoot'

export type PasswordInputFieldProps = Omit<
    React.ComponentProps<'input'>,
    'type'
>

export function PasswordInputField({
    id,
    className,
    ...props
}: PasswordInputFieldProps): React.JSX.Element {
    const { inputId, setInputId, isVisible } = usePasswordInput()

    useEffect(() => {
        if (id) setInputId(id)
    }, [id, setInputId])

    return (
        <input
            type={isVisible ? 'text' : 'password'}
            className='w-full disabled:cursor-not-allowed'
            id={inputId}
            {...props}
        />
    )
}
