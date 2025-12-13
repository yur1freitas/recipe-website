import { usePasswordInput } from './PasswordInputRoot'

export type PasswordInputButtonProps = Omit<
    React.ComponentProps<'button'>,
    'type' | 'id'
>

export function PasswordInputButton({
    children,
    onClick,
    ...props
}: PasswordInputButtonProps): React.JSX.Element {
    const { inputId, toggleVisibility } = usePasswordInput()

    const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        toggleVisibility()
    }

    return (
        <button
            className='cursor-pointer [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'
            aria-controls={inputId}
            onClick={clickHandler}
            type='button'
            id={inputId}
            {...props}
        >
            {children}
        </button>
    )
}
